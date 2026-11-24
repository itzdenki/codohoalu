import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  STORY_SCENES,
  STORY_AUDIO_ALIASES,
  STORY_AUDIO_SLUGS,
  estimateSpokenWeight,
} from '../src/data/storyScenes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_AUDIO_ROOT = path.resolve(__dirname, '../public/audio/stories');

const BITRATES_V1_L3 = [
  0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0,
];
const BITRATES_V2_L3 = [
  0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 0,
];
const SRATES = {
  3: [44100, 48000, 32000, 0],
  2: [22050, 24000, 16000, 0],
  0: [11025, 12000, 8000, 0],
};

function readBits(bytes, bitPos, n) {
  let val = 0;
  for (let i = 0; i < n; i += 1) {
    val = (val << 1) | ((bytes[(bitPos + i) >> 3] >> (7 - ((bitPos + i) & 7))) & 1);
  }
  return val;
}

function parseMp3Frames(buf) {
  let offset = 0;
  if (buf.slice(0, 3).toString() === 'ID3') {
    offset =
      10 +
      (((buf[6] & 0x7f) << 21) |
        ((buf[7] & 0x7f) << 14) |
        ((buf[8] & 0x7f) << 7) |
        (buf[9] & 0x7f));
  }

  const frames = [];
  let pos = offset;
  let time = 0;

  while (pos + 36 < buf.length) {
    if (buf[pos] === 0xff && (buf[pos + 1] & 0xe0) === 0xe0) {
      const ver = (buf[pos + 1] >> 3) & 3;
      const layer = (buf[pos + 1] >> 1) & 3;
      const crc = (buf[pos + 1] & 1) === 0;
      const brIdx = (buf[pos + 2] >> 4) & 15;
      const srIdx = (buf[pos + 2] >> 2) & 3;
      const pad = (buf[pos + 2] >> 1) & 1;
      const mode = (buf[pos + 3] >> 6) & 3;

      if (layer === 1 && brIdx > 0 && brIdx < 15 && srIdx < 3 && SRATES[ver]) {
        const br =
          (ver === 3 ? BITRATES_V1_L3[brIdx] : BITRATES_V2_L3[brIdx]) * 1000;
        const sr = SRATES[ver][srIdx];
        const spf = ver === 3 ? 1152 : 576;
        const fsize = Math.floor(((spf / 8) * br) / sr) + pad;
        const nch = mode === 3 ? 1 : 2;
        const sideStart = pos + 4 + (crc ? 2 : 0);

        let maxGain = 160;
        if (ver === 3) {
          const sideLen = nch === 1 ? 17 : 32;
          const side = buf.slice(sideStart, sideStart + sideLen);
          let bp = 9 + (nch === 1 ? 5 : 3) + nch * 4;
          maxGain = 0;
          for (let gr = 0; gr < 2; gr += 1) {
            for (let ch = 0; ch < nch; ch += 1) {
              const g = readBits(side, bp + 21, 8);
              if (g > maxGain) maxGain = g;
              bp += 59;
            }
          }
        }

        frames.push({ t: time, pos, end: pos + fsize, g: maxGain });
        time += spf / sr;
        pos += fsize;
        continue;
      }
    }
    pos += 1;
  }

  return { frames, duration: time };
}

// Mốc cắt chuẩn xác đến 0.01s đã kiểm chứng thực tế bằng tai nghe
const VERIFIED_CUTS = {
  'vi:m1.mp3': [0, 6.32, 13.19, 22.40, 30.24, 38.65, 45.39, 53.89],
  'vi:codohoalu.mp3': [0, 6.57, 13.53, 22.83, 30.81, 39.39, 46.03, 54.79],
};

function findNewestSectionMp3(lang, storyKey) {
  const candidates =
    STORY_AUDIO_ALIASES?.[storyKey] ||
    (STORY_AUDIO_SLUGS[storyKey] ? [STORY_AUDIO_SLUGS[storyKey]] : []);

  let newest = null;
  for (const slug of candidates) {
    const fileName = `${slug}.mp3`;
    const fullPath = path.join(PUBLIC_AUDIO_ROOT, lang, fileName);
    if (fs.existsSync(fullPath)) {
      const mtimeMs = fs.statSync(fullPath).mtimeMs;
      if (!newest || mtimeMs > newest.mtimeMs) {
        newest = { slug, fileName, fullPath, mtimeMs };
      }
    }
  }
  return newest;
}

function splitSectionFile(lang, storyKey) {
  const srcInfo = findNewestSectionMp3(lang, storyKey);
  if (!srcInfo) return false;
  const { fileName, fullPath: srcPath, mtimeMs: srcMtime } = srcInfo;

  const steps = STORY_SCENES[storyKey] || [];
  if (!steps.length) return false;

  // Bỏ qua nếu tất cả file con đã mới hơn file gộp (trừ khi truyền --force)
  const force = process.argv.includes('--force');
  const allUpToDate =
    !force &&
    steps.every((st) => {
      const p = path.join(PUBLIC_AUDIO_ROOT, lang, `${st.id}.mp3`);
      return fs.existsSync(p) && fs.statSync(p).mtimeMs >= srcMtime;
    });

  if (allUpToDate) {
    console.log(`[SKIP] ${lang}/${fileName} -> ${steps.length} câu đã được cắt sẵn.`);
    return true;
  }

  const buf = fs.readFileSync(srcPath);
  const { frames, duration } = parseMp3Frames(buf);
  if (!frames.length) return false;

  let cuts;
  const verifiedKey = `${lang}:${fileName}`;
  if (
    VERIFIED_CUTS[verifiedKey] &&
    VERIFIED_CUTS[verifiedKey].length === steps.length
  ) {
    cuts = [...VERIFIED_CUTS[verifiedKey], duration + 1];
  } else {
    const sortedGains = frames.map((f) => f.g).sort((a, b) => a - b);
    const silenceThresh = sortedGains[Math.floor(0.2 * sortedGains.length)];

    const valleys = [];
    let inSil = false;
    let sStart = 0;
    let minG = 999;

    for (const f of frames) {
      if (f.g <= silenceThresh) {
        if (!inSil) {
          inSil = true;
          sStart = f.t;
          minG = f.g;
        } else if (f.g < minG) {
          minG = f.g;
        }
      } else if (inSil) {
        const dur = f.t - sStart;
        if (dur >= 0.14) {
          valleys.push({
            mid: (sStart + f.t) / 2,
            dur,
            minG,
          });
        }
        inSil = false;
      }
    }

    const weights = steps.map((st) =>
      estimateSpokenWeight(st.text?.[lang] || st.text?.vi || '')
    );
    const totalWeight = weights.reduce((a, b) => a + b, 0) || 1;

    cuts = [0];
    let accW = 0;
    for (let i = 0; i < steps.length - 1; i += 1) {
      accW += weights[i];
      const expectedT = (accW / totalWeight) * duration;
      const prevCut = cuts[cuts.length - 1];

      const candidates = valleys.filter(
        (v) =>
          v.mid > prevCut + 2.0 &&
          v.mid < duration - 1.5 &&
          Math.abs(v.mid - expectedT) <= 2.6
      );

      if (candidates.length > 0) {
        candidates.sort((a, b) => {
          const scoreA = Math.min(0.35, a.dur) * 1.4 - Math.abs(a.mid - expectedT) * 1.05;
          const scoreB = Math.min(0.35, b.dur) * 1.4 - Math.abs(b.mid - expectedT) * 1.05;
          return scoreB - scoreA;
        });
        cuts.push(candidates[0].mid);
      } else {
        cuts.push(expectedT);
      }
    }
    cuts.push(duration + 1);
  }

  for (let i = 0; i < steps.length; i += 1) {
    const tStart = cuts[i];
    const tEnd = cuts[i + 1];
    const segFrames = frames.filter((f) => f.t >= tStart && f.t < tEnd);
    if (!segFrames.length) continue;
    const byteStart = segFrames[0].pos;
    const byteEnd = segFrames[segFrames.length - 1].end;
    const outPath = path.join(PUBLIC_AUDIO_ROOT, lang, `${steps[i].id}.mp3`);
    fs.writeFileSync(outPath, buf.slice(byteStart, byteEnd));
  }

  console.log(
    `[OK] Đã cắt ${lang}/${fileName} (${duration.toFixed(1)}s) -> ${steps.length} file câu khớp khoảng lặng.`
  );
  return true;
}

const langs = ['vi', 'en', 'ko', 'fr'];
let foundAny = false;
for (const lang of langs) {
  for (const storyKey of Object.keys(STORY_SCENES)) {
    if (splitSectionFile(lang, storyKey)) {
      foundAny = true;
    }
  }
}

if (!foundAny) {
  console.log('Chưa tìm thấy file .mp3 gộp nào trong public/audio/stories/{lang}/.');
}
