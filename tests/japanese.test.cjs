const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync(require('node:path').join(__dirname, '../public/assets/js/thuyet-minh.js'), 'utf8');

function loadJapanesePage({ full = false, map = false, storageBlocked = false } = {}) {
  const panels = [];
  const listeners = {};
  function element(tag) {
    const item = { tag, style: {}, dataset: {}, children: [], hidden: false,
      classList: { add() {}, remove() {}, toggle() {} }, appendChild(child) { this.children.push(child); },
      setAttribute() {}, removeAttribute() {}, addEventListener() {} };
    const children = { a: elementIfNeeded('a'), '.fl': elementIfNeeded('fl'), button: elementIfNeeded('button'), input: elementIfNeeded('input'), '.cur': elementIfNeeded('cur'), '.dur': elementIfNeeded('dur') };
    item.querySelector = selector => children[selector] || null;
    function elementIfNeeded(name) { return { name, style: {}, children: [], dataset: {}, classList: { toggle() {} }, appendChild(child) { this.children.push(child); } }; }
    return item;
  }
  const page = element('page');
  page.parentNode = { insertBefore(item) { panels.push(item); } };
  const body = element('body');
  body.insertBefore = () => {};
  body.hasAttribute = name => name === 'data-ja-full' && full;
  const doc = { body, head: element('head'), readyState: 'complete', documentElement: { clientWidth: 400 },
    createElement: element, querySelectorAll: () => [], getElementById: id => id === 'page-container' ? page : null };
  const win = { addEventListener(name, handler) { listeners[name] = handler; } };
  win.parent = win;
  class Audio { pause() {} removeAttribute() { this.src = ''; } }
  const path = map ? '/pages/ldh/so-do/index_jp.html' : '/pages/dth/gioi-thieu/index_jp.html';
  vm.runInNewContext(source, { document: doc, window: win, location: { pathname: path, search: '', origin: 'http://localhost' },
    localStorage: { getItem: () => { if (storageBlocked) throw new Error('blocked'); return null; }, setItem() {} }, URLSearchParams, Audio });
  return { page, panel: panels.find(item => item.tag === 'article'), listeners, win };
}

test('Japanese full page stays visible; missing translation reports its status and maps remain usable', () => {
  const full = loadJapanesePage({ full: true });
  assert.equal(full.page.hidden, false);
  assert.equal(full.panel.hidden, true);
  const missing = loadJapanesePage();
  assert.equal(missing.page.hidden, true);
  assert.equal(missing.panel.hidden, false);
  assert.match(missing.panel.textContent, /日本語.*準備中/);
  missing.listeners.message({ origin: 'http://localhost', source: missing.win, data: { type: 'parent-lang', lang: 'vi' } });
  assert.equal(missing.page.hidden, false);
  assert.equal(missing.panel.hidden, true);
  const map = loadJapanesePage({ map: true });
  assert.equal(map.page.hidden, false);
  assert.equal(map.panel.hidden, true);
  assert.equal(loadJapanesePage({ map: true, storageBlocked: true }).page.hidden, false);
});
