import test from 'node:test';
import assert from 'node:assert/strict';
import { HOTSPOTS_DTH } from '../public/assets/js/hotspots.js';

test('mở trực tiếp nội dung mà không cần QR, kể cả khi không dùng được localStorage', async t => {
  const names = ['document', 'window', 'location', 'history', 'localStorage', 'navigator'];
  const original = new Map(names.map(name => [name, Object.getOwnPropertyDescriptor(globalThis, name)]));
  t.after(() => names.forEach(name => {
    const descriptor = original.get(name);
    if (descriptor) Object.defineProperty(globalThis, name, descriptor);
    else delete globalThis[name];
  }));

  const listeners = {};
  const stage = {
    innerHTML: '', children: [],
    querySelector() { return null; },
    querySelectorAll() { return []; },
    appendChild(child) { this.children.push(child); },
  };
  const app = {
    innerHTML: '',
    addEventListener() {},
    querySelector(selector) { return selector === '.experience-stage' ? stage : null; },
    querySelectorAll() { return []; },
  };
  const doc = {
    querySelector(selector) { return selector === '#app' ? app : null; },
    createElement() { return { innerHTML: '', className: '', setAttribute() {}, querySelectorAll() { return []; } }; },
  };
  const location = { pathname: '/pages/ldh/den-tho-vua', search: '?qr=old&keep=1', hash: '#detail', origin: 'http://localhost:3000' };
  let replaced;
  Object.defineProperties(globalThis, {
    document: { configurable: true, value: doc },
    window: { configurable: true, value: { addEventListener(name, callback) { listeners[name] = callback; } } },
    location: { configurable: true, value: location },
    history: { configurable: true, value: {
      replaceState(_state, _title, url) { replaced = url; },
      pushState(_state, _title, url) { location.pathname = url.split('?')[0]; },
    } },
    localStorage: { configurable: true, value: { getItem() { throw new Error('blocked'); } } },
    navigator: { configurable: true, get() { throw new Error('Camera must not be requested'); } },
  });

  await import('../public/assets/js/app.js?access-test');
  assert.match(app.innerHTML, /experience-layout/);
  assert.match(stage.children[0].innerHTML, /pages\/ldh\/den-tho-vua\/index_vi\.html/);
  assert.equal(replaced, '/pages/ldh/den-tho-vua?keep=1#detail');

  location.pathname = '/pages/dth/so-do';
  listeners.popstate();
  assert.match(stage.innerHTML, /pages\/dth\/so-do\/index_vi\.html/);
  const frame = {};
  app.querySelectorAll = selector => selector === 'iframe' ? [{ contentWindow: frame }] : [];
  for (const spot of HOTSPOTS_DTH) {
    listeners.message({ origin: location.origin, source: frame, data: { type: 'spot-goto', route: spot.route } });
    assert.equal(location.pathname, `/${spot.route}`);
    assert.ok(stage.children.at(-1).innerHTML.includes(`${spot.route}/index_vi.html`));
  }
  assert.doesNotMatch(app.innerHTML, /CẦN QUÉT MÃ QR/);
});
