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

const LANG_FILES = [
  ['vi', 'index.html'],
  ['en', 'index_en.html'],
  ['fr', 'index_fr.html'],
  ['ko', 'index_kr.html'],
  ['zh', 'index_cn.html'],
  ['ja', 'index_jp.html'],
];

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

test('all 14 topics match every dialogue cue in forward order across all 6 languages', () => {
  for (const [slug, entry] of Object.entries(gallery)) {
    assert.equal(entry.mode, 'cues', `Expected cue mode for ${slug}`);
    const slides = entry.slides;
    assert.ok(slides.length >= 8, `Expected rich storyboard for ${slug}`);

    for (const [lang, fname] of LANG_FILES) {
      const paragraphs = readProseParagraphs(`public/pages/tham-quan/${slug}/${fname}`);
      const captions = makeCaptions(paragraphs, lang);
      const timing = lang === 'vi' ? viTimings[slug] : estimatedStarts(captions);
      const fullText = captions.words
        .join(captions.separator)
        .toLowerCase()
        .replace(/[’‘`]/g, "'")
        .replace(/[“”]/g, '"')
        .replace(/\s+/g, ' ')
        .trim();

      assert.ok(slides[0].label?.[lang], `[${slug}/${lang}] Slide #1 missing label`);
      let cursor = 0;
      for (let i = 1; i < slides.length; i++) {
        const cue = slides[i].cue?.[lang];
        assert.ok(cue, `[${slug}/${lang}] Slide #${i + 1} missing cue`);
        const needle = cue
          .toLowerCase()
          .replace(/[’‘`]/g, "'")
          .replace(/[“”]/g, '"')
          .replace(/\s+/g, ' ')
          .trim();
        const pos = fullText.indexOf(needle, cursor);
        assert.ok(pos >= 0, `[${slug}/${lang}] Slide #${i + 1} cue "${cue}" not found after offset ${cursor}`);
        cursor = pos + needle.length;
        assert.ok(slides[i].label?.[lang], `[${slug}/${lang}] Slide #${i + 1} missing label`);
      }

      const resolved = resolveSlideCues(slides, captions, timing, lang);
      assert.equal(resolved.length, slides.length);
      assert.equal(resolved[0].timeMs, 0);
      for (let i = 1; i < resolved.length; i++) {
        assert.ok(
          resolved[i].timeMs > resolved[i - 1].timeMs,
          `[${slug}/${lang}] Non-monotonic cues at #${i + 1}: ${resolved[i].timeMs} <= ${resolved[i - 1].timeMs}`,
        );
      }
    }
  }
});

test('key landmark & artifact cues switch to exact photo on time in Vietnamese', () => {
  const verify = (slug, checks) => {
    const slides = gallery[slug].slides;
    const paragraphs = readProseParagraphs(`public/pages/tham-quan/${slug}/index.html`);
    const captions = makeCaptions(paragraphs, 'vi');
    const timing = viTimings[slug];
    const resolved = resolveSlideCues(slides, captions, timing, 'vi');
    for (const [timeSec, expectedFile] of checks) {
      const idx = slideIndexAt(slides, resolved, timeSec * 1000);
      assert.equal(
        path.basename(slides[idx].src),
        expectedFile,
        `[${slug}] At ${timeSec}s expected ${expectedFile}, got ${path.basename(slides[idx].src)}`,
      );
    }
  };

  verify('gioi-thieu-di-tich', [
    [0, '01-toan-canh-co-do.jpg'],
    [121.1, 'chua-nhat-tru.jpg'],
    [122.5, 'den-tho-thuc-tiet-cong-chua.jpg'],
    [124.5, 'phu-kinh-thien.jpg'],
    [129.8, 'bai-duong-den-dinh-2024.jpg'],
    [132.0, 'den-le-toan-canh.jpg'],
  ]);

  verify('long-sang-nghi-mon-ngoai', [
    [0, '03-toan-canh-long-sang.jpg'],
    [45, '09-ban-tay-nguoi-tren-long-sang.jpg'],
  ]);

  verify('nha-bia-den-dinh', [
    [8.5, '06-ba-tam-van-bia.jpg'],
    [22, '07-bia-hoang-dinh-1608.jpg'],
    [50, '09-bia-chinh-hoa-1696.jpg'],
    [104, '12-luong-chuot-chau-cua.jpg'],
    [126, '04-rong-mat-sau-bia.jpg'],
    [150, '14-bia-thieu-tri-1843.jpg'],
  ]);

  verify('den-vua-le', [
    [0, '07-canh-ngoai-den-le.jpg'],
    [71, '15-xa-nga-voi.jpg'],
    [93, '18-tuong-vua-le-dai-hanh.jpg'],
    [217, '21-chan-dung-duong-van-nga.jpg'],
  ]);

  verify('hai-nha-bia-den-le', [
    [8, '04-nha-bia-ben-trai.jpg'],
    [46, '09-bia-phai-lung-rua.jpg'],
  ]);

  verify('nha-trung-bay-di-san', [
    [0, '04-ho-khai-quat-1977.jpg'],
    [53, '07-vo-vai-the-ky-x.jpg'],
    [58, '08-tien-thai-binh-thien-phuc.jpg'],
    [75, '10-gach-dai-viet-quoc-quan-thanh-chuyen.jpg'],
    [78.2, '11-ngoi-ong-hoa-sen.jpg'],
    [79.5, '12-tuong-chim-phuong-dat-nung.jpg'],
    [86, '13-cot-kinh-phat-toan-canh.jpg'],
  ]);
});

test('non-cue arrays still fall back cleanly to standard 10-second rotation', () => {
  const plainSlides = [{ src: '/a.jpg' }, { src: '/b.jpg' }, { src: '/c.jpg' }];
  const resolved = resolveSlideCues(plainSlides, { words: [], separator: ' ' }, { starts: [], duration: 60000 }, 'vi');
  assert.equal(resolved, null);
  assert.equal(slideIndexAt(plainSlides, null, 0), 0);
  assert.equal(slideIndexAt(plainSlides, null, 9999), 0);
  assert.equal(slideIndexAt(plainSlides, null, 10000), 1);
  assert.equal(slideIndexAt(plainSlides, null, 25000), 2);
});
