import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { HOTSPOTS_DTH } from '../public/assets/js/hotspots.js';

test('sơ đồ vua Đinh mở đúng cả chín điểm từ chú giải và các lá cờ', async t => {
  const names = ['document', 'window', 'location', 'localStorage'];
  const original = new Map(names.map(name => [name, Object.getOwnPropertyDescriptor(globalThis, name)]));
  t.after(() => names.forEach(name => {
    const descriptor = original.get(name);
    if (descriptor) Object.defineProperty(globalThis, name, descriptor);
    else delete globalThis[name];
  }));

  class Element {
    constructor(tag) {
      this.tag = tag;
      this.children = [];
      this.style = {};
      this.attributes = {};
      this.listeners = {};
      this.dataset = {};
      this.classList = { add: name => { this.addedClass = name; } };
    }
    appendChild(child) { this.children.push(child); return child; }
    append(...children) { this.children.push(...children); }
    setAttribute(name, value) { this.attributes[name] = value; }
    addEventListener(name, handler) { this.listeners[name] = handler; }
    querySelector(selector) { return selector === '.bi' ? this.image : null; }
  }

  const page = new Element('page');
  page.image = new Element('img');
  const key = new Element('section');
  key.hidden = true;
  const doc = {
    body: new Element('body'), documentElement: {}, listeners: {},
    createElement: tag => new Element(tag),
    getElementById: id => id === 'pf1' ? page : id === 'dinh-map-key' ? key : null,
    addEventListener(name, handler) { this.listeners[name] = handler; },
  };
  const opened = [];
  const parent = {};
  const win = {
    parent, listeners: {}, TravisUtility: { goTo(route) { opened.push(route); } },
    addEventListener(name, handler) { this.listeners[name] = handler; },
  };
  Object.defineProperties(globalThis, {
    document: { configurable: true, value: doc },
    window: { configurable: true, value: win },
    location: { configurable: true, value: { pathname: '/pages/dth/so-do/index_vi.html', search: '', origin: 'http://localhost' } },
    localStorage: { configurable: true, value: { getItem() { throw new Error('blocked'); } } },
  });

  const { DINH_FLAG_POSITIONS } = await import('../public/assets/js/dinh-map.js?map-test');
  assert.equal(doc.body.addedClass, 'dinh-map-ready');
  assert.equal(key.hidden, false);
  assert.match(page.children[0].textContent, /VUA ĐINH TIÊN HOÀNG/);
  const flags = page.children.slice(1);
  const list = key.children[1];
  assert.equal(flags.length, 9);
  assert.equal(list.children.length, 9);
  assert.ok((DINH_FLAG_POSITIONS[8][0] - DINH_FLAG_POSITIONS[7][0]) * 538.583 / 100 > 24);

  function click(link, extra = {}) {
    const event = { button: 0, preventDefault() { this.prevented = true; }, ...extra };
    link.listeners.click(event);
    return event;
  }
  HOTSPOTS_DTH.forEach((spot, index) => {
    assert.ok(existsSync(new URL(`../public/${spot.route}/index_vi.html`, import.meta.url)), spot.route);
    assert.equal(flags[index].href, `/${spot.route}/index_vi.html`);
    assert.equal(list.children[index].href, `/${spot.route}/index_vi.html`);
    assert.match(flags[index].attributes['aria-label'], new RegExp(`^${index + 1}\\.`));
    assert.equal(click(flags[index]).prevented, true);
    assert.equal(click(list.children[index]).prevented, true);
    assert.deepEqual(opened.splice(0), [spot.route, spot.route]);
  });
  assert.equal(click(list.children[0], { ctrlKey: true }).prevented, undefined);
  assert.deepEqual(opened, []);

  win.listeners.message({ origin: 'http://localhost', source: parent, data: { type: 'parent-lang', lang: 'ja' } });
  assert.equal(doc.documentElement.lang, 'ja');
  assert.match(page.children[0].textContent, /丁先皇廟/);
  assert.equal(list.children[0].href, '/pages/dth/ngo-mon-quan/index_jp.html');
  assert.equal(list.children[0].children[1].children[0].textContent, '午門関');
  win.listeners.message({ origin: 'http://elsewhere', source: parent, data: { type: 'parent-lang', lang: 'vi' } });
  assert.equal(doc.documentElement.lang, 'ja');
  for (const [lang, suffix] of [['vi', 'vi'], ['en', 'en'], ['fr', 'fr'], ['ko', 'kr'], ['zh', 'cn'], ['ja', 'jp']]) {
    win.listeners.message({ origin: 'http://localhost', source: parent, data: { type: 'parent-lang', lang } });
    assert.ok(page.children[0].textContent);
    for (const link of list.children) assert.ok(link.href.endsWith(`/index_${suffix}.html`));
  }
});

test('mọi phiên bản ngôn ngữ của sơ đồ đều tải phần giao diện dùng chung', () => {
  for (const suffix of ['', '_vi', '_en', '_fr', '_kr', '_cn', '_jp']) {
    const html = readFileSync(new URL(`../public/pages/dth/so-do/index${suffix}.html`, import.meta.url), 'utf8');
    assert.match(html, /id="dinh-map-key"/);
    assert.match(html, /href="\/assets\/css\/dinh-map\.css"/);
    assert.match(html, /src="\/assets\/js\/dinh-map\.js"/);
  }
});
