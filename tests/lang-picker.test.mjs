import test from 'node:test';
import assert from 'node:assert/strict';

function setupEnv({ pathname = '/', search = '', storedLang = null } = {}) {
  const names = ['document', 'window', 'location', 'history', 'localStorage'];
  const original = new Map(names.map(name => [name, Object.getOwnPropertyDescriptor(globalThis, name)]));
  const store = new Map();
  if (storedLang !== null) store.set('lang', storedLang);

  let clickHandler = null;
  const stage = {
    innerHTML: '',
    children: [],
    querySelector() { return null; },
    querySelectorAll() { return []; },
    appendChild(child) { this.children.push(child); },
  };
  const app = {
    innerHTML: '',
    addEventListener(type, fn) { if (type === 'click') clickHandler = fn; },
    contains() { return true; },
    querySelector(selector) { return selector === '.experience-stage' ? stage : null; },
    querySelectorAll() { return []; },
  };
  const doc = {
    querySelector(selector) { return selector === '#app' ? app : null; },
    createElement() { return { innerHTML: '', className: '', setAttribute() {}, querySelectorAll() { return []; } }; },
  };

  Object.defineProperties(globalThis, {
    document: { configurable: true, value: doc },
    window: { configurable: true, value: { addEventListener() {} } },
    location: { configurable: true, value: { pathname, search, hash: '', origin: 'https://codohoalu.pages.dev' } },
    history: { configurable: true, value: { replaceState() {}, pushState() {} } },
    localStorage: {
      configurable: true,
      value: {
        getItem: (k) => (store.has(k) ? store.get(k) : null),
        setItem: (k, v) => { store.set(k, String(v)); },
      },
    },
  });

  const cleanup = () => names.forEach(name => {
    const descriptor = original.get(name);
    if (descriptor) Object.defineProperty(globalThis, name, descriptor);
    else delete globalThis[name];
  });

  return { stage, store, click: (button) => clickHandler?.({ target: { closest: () => button, classList: { contains: () => false } } }), cleanup };
}

test('vào trang chủ lần đầu (chưa có localStorage) hiện hộp chọn 5 ngôn ngữ và lưu khi chọn', async t => {
  const env = setupEnv({ pathname: '/', storedLang: null });
  t.after(env.cleanup);

  await import('../public/assets/js/app.js?lang-picker-first');
  assert.match(env.stage.innerHTML, /lang-picker-backdrop/);
  assert.match(env.stage.innerHTML, /data-pick-lang="vi"/);
  assert.match(env.stage.innerHTML, /data-pick-lang="en"/);
  assert.match(env.stage.innerHTML, /data-pick-lang="ko"/);
  assert.match(env.stage.innerHTML, /data-pick-lang="fr"/);
  assert.match(env.stage.innerHTML, /data-pick-lang="zh"/);
  assert.doesNotMatch(env.stage.innerHTML, /data-pick-lang="ja"/);

  // User picks English
  env.click({ dataset: { pickLang: 'en' } });
  assert.equal(env.store.get('lang'), 'en');
  assert.doesNotMatch(env.stage.innerHTML, /lang-picker-backdrop/);
  assert.match(env.stage.innerHTML, /English/);
});

test('đã lưu ngôn ngữ trong localStorage thì vào trang chủ không bắt chọn lại', async t => {
  const env = setupEnv({ pathname: '/', storedLang: 'fr' });
  t.after(env.cleanup);

  await import('../public/assets/js/app.js?lang-picker-saved');
  assert.doesNotMatch(env.stage.innerHTML, /lang-picker-backdrop/);
  assert.match(env.stage.innerHTML, /Français/);

  // Clicking the Home language pill reopens picker with close button
  env.click({ dataset: { action: 'open-lang-picker' } });
  assert.match(env.stage.innerHTML, /lang-picker-backdrop/);
  assert.match(env.stage.innerHTML, /lang-picker-close/);
});
