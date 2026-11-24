import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { captionAt, columnCount, estimatedStarts, makeCaptions, mountVisitGuide } from '../public/pages/tham-quan/_shared/reader-guide.js';
import { VISIT_TOPICS, visitNarrationSource } from '../public/assets/js/visit-topics.js';

test('chữ chạy giữ đúng câu gốc ở cả hai chiều tua', () => {
  const captions = makeCaptions(['Cố đô Hoa Lư.', 'Đền vua Đinh.'], 'vi');
  const starts = [0, 500, 600, 800, 1400, 1600, 1900];
  assert.deepEqual(captionAt(captions, starts, 0), { read: 'Cố', remaining: ' đô Hoa Lư.' });
  assert.deepEqual(captionAt(captions, starts, 1700), { read: 'Đền vua', remaining: ' Đinh.' });
  assert.deepEqual(captionAt(captions, starts, 600), { read: 'Cố đô Hoa', remaining: ' Lư.' });
  const japanese = makeCaptions(['古都ホアルー。', 'ディン王廟。'], 'ja');
  const timing = estimatedStarts(japanese);
  assert.equal(japanese.words.join(japanese.separator), '古都ホアルー。ディン王廟。');
  assert.ok(timing.duration > timing.starts.at(-1));
});

test('mốc thời gian khớp với nội dung và tăng theo thứ tự của 14 bài tiếng Việt', async () => {
  const shared = new URL('../public/pages/tham-quan/_shared/', import.meta.url);
  const timings = JSON.parse(await readFile(new URL('visit-timings-vi.json', shared), 'utf8'));
  for (const topic of VISIT_TOPICS) {
    const html = await readFile(new URL(`../${topic.slug}/index_vi.html`, shared), 'utf8');
    const prose = html.split('<div class="reader-prose">')[1].split('<footer class="reader-document-footer">')[0];
    const paragraphs = Array.from(prose.matchAll(/<p[^>]*>(.*?)<\/p>/gs), ([, text]) => text.replace(/<[^>]+>/g, '').replaceAll('&quot;', '"'));
    const captions = makeCaptions(paragraphs, 'vi');
    const { starts, duration } = timings[topic.slug];
    assert.equal(starts.length, captions.words.length, topic.slug);
    assert.ok(starts.every((time, index) => Number.isFinite(time) && time >= (starts[index - 1] ?? 0) && time <= duration), topic.slug);
  }
});

test('bộ đếm trang PDF giữ đúng khi chiều rộng màn hình có phần lẻ', () => {
  assert.equal(columnCount(292.4, 292, 24), 1);
  assert.equal(columnCount(292.4, 925, 24), 3);
});

test('nguồn tự phát trùng với bản thuyết minh trong từng trang ngôn ngữ', async () => {
  const pages = new URL('../public/pages/tham-quan/', import.meta.url);
  const languages = { vi: 'vi', en: 'en', fr: 'fr', ko: 'kr', zh: 'cn', ja: 'jp' };
  for (const topic of VISIT_TOPICS) {
    for (const [language, suffix] of Object.entries(languages)) {
      const html = await readFile(new URL(`${topic.slug}/index_${suffix}.html`, pages), 'utf8');
      const source = html.match(/<audio\b[^>]*\bsrc="([^"]+)"/)?.[1] ?? '';
      assert.equal(visitNarrationSource(topic, language), source, `${topic.slug}: ${language}`);
    }
  }
});

test('ảnh phát được khi tự phát bị chặn, PDF giữ đúng vị trí nghe', async t => {
  class Element extends EventTarget {
    constructor(nodes = {}) {
      super();
      this.nodes = nodes;
      this.attributes = {};
    }
    querySelector(selector) { return this.nodes[selector] ?? null; }
    append(...children) { this.children = children; }
    setAttribute(name, value) { this.attributes[name] = value; }
    cloneNode() { return this; }
  }
  const prose = new Element();
  prose.querySelectorAll = () => [{ textContent: 'The Hoa Lu ancient capital.' }];
  const article = new Element({
    '.reader-heading h1': { textContent: 'Hoa Lu' },
    '.reader-lead': new Element({ img: new Element() }),
    '.reader-prose': prose,
  });
  const viewport = new Element();
  viewport.getBoundingClientRect = () => ({ width: 292.4 });
  viewport.scrollWidth = 609;
  const counter = new Element();
  const previous = new Element();
  const next = new Element();
  const book = new Element({
    '.guide-page-viewport': viewport, '.guide-page-flow': new Element(),
    '.guide-page-number': counter, '.guide-page-previous': previous, '.guide-page-next': next,
  });
  book.hidden = true;
  const pdf = new Element();
  const story = new Element();
  const photoButton = new Element();
  const guide = new Element({
    h1: new Element(), '.guide-story-photo': photoButton, '.guide-pdf-button': pdf,
    '.guide-story-view': story, '.guide-reading-view': book, '.guide-caption-read': new Element(),
    '.guide-caption-rest': new Element(),
  });
  const audio = Object.assign(new Element(), {
    currentTime: 4,
    duration: 10,
    paused: true,
    playAttempts: 0,
    pause() { this.paused = true; },
    play() {
      if (this.playAttempts++ === 0) return Promise.reject(new DOMException('Autoplay blocked', 'NotAllowedError'));
      this.paused = false;
      return Promise.resolve();
    },
  });
  const globals = {
    document: {
      querySelector: () => article,
      documentElement: { lang: 'en' },
      createElement: () => guide,
      body: { append() {}, classList: { add() {} } },
    },
    window: new EventTarget(),
    getComputedStyle: () => ({ columnGap: '24px' }),
  };
  for (const [name, value] of Object.entries(globals)) {
    const original = Object.getOwnPropertyDescriptor(globalThis, name);
    Object.defineProperty(globalThis, name, { configurable: true, value });
    t.after(() => original ? Object.defineProperty(globalThis, name, original) : delete globalThis[name]);
  }
  assert.equal(mountVisitGuide(audio), true);
  assert.doesNotMatch(guide.innerHTML, /guide-story-controls|reader-audio/);
  await Promise.resolve();
  assert.equal(audio.paused, true);
  assert.equal(photoButton.attributes['aria-label'], 'Play');
  photoButton.dispatchEvent(new Event('click'));
  assert.equal(audio.paused, false);
  assert.equal(photoButton.attributes['aria-label'], 'Pause');
  photoButton.dispatchEvent(new Event('click'));
  assert.equal(audio.paused, true);
  assert.equal(photoButton.attributes['aria-label'], 'Play');
  photoButton.dispatchEvent(new Event('click'));
  assert.equal(audio.paused, false);
  assert.equal(audio.currentTime, 4);
  pdf.dispatchEvent(new Event('click'));
  assert.equal(audio.paused, false);
  assert.equal(story.hidden, true);
  assert.equal(book.hidden, false);
  audio.dispatchEvent(new Event('playing'));
  assert.equal(audio.paused, false);
  assert.equal(counter.textContent, '1 / 2');
  assert.equal(previous.disabled, true);
  next.dispatchEvent(new Event('click'));
  assert.equal(counter.textContent, '2 / 2');
  assert.equal(next.disabled, true);
  assert.equal(viewport.scrollLeft, 316.4);
  pdf.dispatchEvent(new Event('click'));
  assert.equal(story.hidden, false);
  assert.equal(book.hidden, true);
  assert.equal(audio.paused, false);
  assert.equal(audio.currentTime, 4);
  photoButton.dispatchEvent(new Event('click'));
  pdf.dispatchEvent(new Event('click'));
  pdf.dispatchEvent(new Event('click'));
  assert.equal(audio.paused, true);
});
