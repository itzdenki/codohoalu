import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  makeCaptions,
  estimatedStarts,
  resolveSlideCues,
  slideIndexAt,
} from '../public/pages/tham-quan/_shared/reader-guide.js';

const ROOT = process.cwd();
const GALLERY_PATH = path.join(ROOT, 'public/pages/tham-quan/_shared/visit-gallery.json');
const VI_TIMINGS_PATH = path.join(ROOT, 'public/pages/tham-quan/_shared/visit-timings-vi.json');

const gallery = JSON.parse(fs.readFileSync(GALLERY_PATH, 'utf8'));
const viTimings = JSON.parse(fs.readFileSync(VI_TIMINGS_PATH, 'utf8'));

function decodeHtml(str) {
  return str
    .replace(/<[^>]+>/g, '')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function readProseParagraphs(relPath) {
  const html = fs.readFileSync(path.join(ROOT, relPath), 'utf8');
  const start = html.indexOf('<div class="reader-prose">');
  const end = html.indexOf('<footer', start);
  assert.ok(start >= 0 && end > start, `Could not find reader-prose in ${relPath}`);
  const prose = html.slice(start, end);
  return [...prose.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)]
    .map(match => decodeHtml(match[1]))
    .filter(Boolean);
}

test('all images referenced in visit-gallery.json exist on disk and fit Cloudflare Pages size limit', () => {
  const entries = Object.entries(gallery);
  assert.equal(entries.length, 14, 'Expected all 14 topics in visit-gallery.json');
  for (const [slug, entry] of entries) {
    const slides = Array.isArray(entry) ? entry : entry.slides;
    assert.ok(Array.isArray(slides) && slides.length > 0, `Topic ${slug} must have slides`);
    for (const item of slides) {
      const src = typeof item === 'string' ? item : item.src;
      assert.ok(src && src.startsWith('/'), `Invalid slide src in ${slug}: ${src}`);
      const fullPath = path.join(ROOT, 'public', src.replace(/^\//, ''));
      assert.ok(fs.existsSync(fullPath), `Missing image asset for ${slug}: ${src}`);
      const stat = fs.statSync(fullPath);
      assert.ok(stat.size > 0 && stat.size < 25 * 1024 * 1024, `Asset out of size range: ${src}`);
    }
  }
});

test('gioi-thieu-di-tich storyboard matches every dialogue cue in order across all 6 languages', () => {
  const entry = gallery['gioi-thieu-di-tich'];
  assert.equal(entry.mode, 'cues');
  const slides = entry.slides;
  assert.equal(slides.length, 20);

  const langFiles = [
    ['vi', 'public/pages/tham-quan/gioi-thieu-di-tich/index.html'],
    ['en', 'public/pages/tham-quan/gioi-thieu-di-tich/index_en.html'],
    ['fr', 'public/pages/tham-quan/gioi-thieu-di-tich/index_fr.html'],
    ['ko', 'public/pages/tham-quan/gioi-thieu-di-tich/index_kr.html'],
    ['zh', 'public/pages/tham-quan/gioi-thieu-di-tich/index_cn.html'],
    ['ja', 'public/pages/tham-quan/gioi-thieu-di-tich/index_jp.html'],
  ];

  for (const [lang, file] of langFiles) {
    const paragraphs = readProseParagraphs(file);
    const captions = makeCaptions(paragraphs, lang);
    const timing = lang === 'vi' ? viTimings['gioi-thieu-di-tich'] : estimatedStarts(captions);
    const fullText = captions.words
      .join(captions.separator)
      .toLowerCase()
      .replace(/[’‘`]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/\s+/g, ' ')
      .trim();

    let cursor = 0;
    for (let i = 1; i < slides.length; i++) {
      const cue = slides[i].cue?.[lang];
      assert.ok(cue, `Slide #${i + 1} missing ${lang} cue`);
      const needle = cue
        .toLowerCase()
        .replace(/[’‘`]/g, "'")
        .replace(/[“”]/g, '"')
        .replace(/\s+/g, ' ')
        .trim();
      const pos = fullText.indexOf(needle, cursor);
      assert.ok(pos >= 0, `[${lang}] Slide #${i + 1} cue "${cue}" not found in sequence after offset ${cursor}`);
      cursor = pos + needle.length;
      assert.ok(slides[i].label?.[lang], `Slide #${i + 1} missing ${lang} label`);
    }

    const resolved = resolveSlideCues(slides, captions, timing, lang);
    assert.equal(resolved.length, slides.length);
    assert.equal(resolved[0].timeMs, 0);
    for (let i = 1; i < resolved.length; i++) {
      assert.ok(
        resolved[i].timeMs > resolved[i - 1].timeMs,
        `[${lang}] Non-monotonic cues at #${i + 1}: ${resolved[i].timeMs} <= ${resolved[i - 1].timeMs}`,
      );
    }
  }
});

test('gioi-thieu-di-tich Vietnamese landmark cues switch to exact landmark photo on time with quick transitions', () => {
  const slides = gallery['gioi-thieu-di-tich'].slides;
  const paragraphs = readProseParagraphs('public/pages/tham-quan/gioi-thieu-di-tich/index.html');
  const captions = makeCaptions(paragraphs, 'vi');
  const timing = viTimings['gioi-thieu-di-tich'];
  const resolved = resolveSlideCues(slides, captions, timing, 'vi');

  const checkLandmark = (timeSec, expectedFile, expectedQuick) => {
    const idx = slideIndexAt(slides, resolved, timeSec * 1000);
    assert.equal(
      path.basename(slides[idx].src),
      expectedFile,
      `At ${timeSec}s expected ${expectedFile}, got ${path.basename(slides[idx].src)}`,
    );
    if (expectedQuick !== undefined) {
      assert.equal(resolved[idx].quick, expectedQuick, `Unexpected quick flag for ${expectedFile}`);
    }
  };

  checkLandmark(0, '01-toan-canh-co-do.jpg', false);
  checkLandmark(12, 'toan-canh-khu-di-tich-co-do-hoa-lu.jpg');
  checkLandmark(18, 'den-tho-vua-dinh-tien-hoang.jpg');
  checkLandmark(31.5, 'den-tho-vua-le-dai-hanh.jpg');
  checkLandmark(53, 'nui-non-va-dia-the-bao-quanh-co-do.png');
  checkLandmark(121.1, 'chua-nhat-tru.jpg', true);
  checkLandmark(122.5, 'den-tho-thuc-tiet-cong-chua.jpg', true);
  checkLandmark(124.5, 'phu-kinh-thien.jpg', true);
  checkLandmark(129.8, 'bai-duong-den-dinh-2024.jpg', true);
  checkLandmark(132.0, 'den-le-toan-canh.jpg', true);
  checkLandmark(135.5, '03-san-rong-den-dinh.jpg', true);
});

test('non-cue topics fall back cleanly to standard 10-second rotation', () => {
  const slides = gallery['den-vua-dinh'];
  const resolved = resolveSlideCues(slides, { words: [], separator: ' ' }, { starts: [], duration: 60000 }, 'vi');
  assert.equal(resolved, null);
  assert.equal(slideIndexAt(slides, null, 0), 0);
  assert.equal(slideIndexAt(slides, null, 9999), 0);
  assert.equal(slideIndexAt(slides, null, 10000), 1);
  assert.equal(slideIndexAt(slides, null, 25000), 2);
});
