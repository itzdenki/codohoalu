import test from 'node:test';
import assert from 'node:assert/strict';
import { SESSION_DURATION_MS, SESSION_KEY, ensureSession, formatRemaining } from '../public/assets/js/session.js';
import { matchSiteQR } from '../public/assets/js/qr-scanner.js';

function memoryStorage(initial = {}) {
  const map = new Map(Object.entries(initial));
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => { map.set(k, String(v)); },
  };
}

test('mỗi phiên hoạt động có thời hạn đúng 1 tiếng (60 phút), hết hạn không tự mở lại trừ khi gia hạn', () => {
  assert.equal(SESSION_DURATION_MS, 60 * 60 * 1000);
  const store = memoryStorage();
  const t0 = 1_700_000_000_000;

  const s1 = ensureSession({ now: t0, storage: store });
  assert.equal(s1.active, true);
  assert.equal(s1.expiresAt, t0 + SESSION_DURATION_MS);
  assert.equal(formatRemaining(s1.remainingMs), '60:00');

  // After 30 minutes: still active
  const s2 = ensureSession({ now: t0 + 30 * 60 * 1000, storage: store });
  assert.equal(s2.active, true);
  assert.equal(s2.expiresAt, s1.expiresAt);
  assert.equal(formatRemaining(s2.remainingMs), '30:00');

  // At 60 minutes: expired
  const s3 = ensureSession({ now: t0 + 60 * 60 * 1000, storage: store });
  assert.equal(s3.active, false);
  assert.equal(s3.remainingMs, 0);
  assert.equal(formatRemaining(s3.remainingMs), '00:00');

  // Reloading after 65 minutes stays expired
  const s4 = ensureSession({ now: t0 + 65 * 60 * 1000, storage: store });
  assert.equal(s4.active, false);

  // Renewing starts a fresh 60-minute session
  const s5 = ensureSession({ now: t0 + 65 * 60 * 1000, storage: store, renew: true });
  assert.equal(s5.active, true);
  assert.equal(s5.expiresAt, t0 + 125 * 60 * 1000);
  assert.equal(formatRemaining(s5.remainingMs), '60:00');
});

test('matchSiteQR chấp nhận QR trang chủ và 14 QR nội dung để gia hạn phiên, từ chối mã ngoài', () => {
  assert.deepEqual(matchSiteQR('https://codohoalu.pages.dev/'), { kind: 'home', topic: null });
  const topicMatch = matchSiteQR('https://codohoalu.pages.dev/pages/tham-quan/den-vua-dinh');
  assert.equal(topicMatch?.kind, 'visit');
  assert.equal(topicMatch?.topic?.slug, 'den-vua-dinh');

  assert.equal(matchSiteQR('https://google.com/'), null);
  assert.equal(matchSiteQR('https://codohoalu.pages.dev/pages/tham-quan/khong-ton-tai'), null);
  assert.equal(matchSiteQR('random-qr-text'), null);
});

test('ứng dụng khóa màn hình hết phiên khi localStorage đã quá 1 tiếng', async t => {
  const names = ['document', 'window', 'location', 'history', 'localStorage'];
  const original = new Map(names.map(name => [name, Object.getOwnPropertyDescriptor(globalThis, name)]));
  t.after(() => names.forEach(name => {
    const descriptor = original.get(name);
    if (descriptor) Object.defineProperty(globalThis, name, descriptor);
    else delete globalThis[name];
  }));

  const store = memoryStorage({
    lang: 'vi',
    [SESSION_KEY]: String(Date.now() - 10_000),
  });
  const stage = { innerHTML: '', querySelector() { return null; }, querySelectorAll() { return []; } };
  const app = {
    innerHTML: '',
    addEventListener() {},
    querySelector(sel) { return sel === '.experience-stage' ? stage : null; },
    querySelectorAll() { return []; },
  };

  Object.defineProperties(globalThis, {
    document: { configurable: true, value: { querySelector: sel => (sel === '#app' ? app : null), addEventListener() {} } },
    window: { configurable: true, value: { addEventListener() {} } },
    location: { configurable: true, value: { pathname: '/pages/tham-quan/den-vua-dinh', search: '', hash: '', origin: 'https://codohoalu.pages.dev' } },
    history: { configurable: true, value: { replaceState() {}, pushState() {} } },
    localStorage: { configurable: true, value: store },
  });

  await import('../public/assets/js/app.js?session-expired-test');
  assert.match(app.innerHTML, /session-expired-screen/);
  assert.match(app.innerHTML, /data-action="renew-qr"/);
  assert.doesNotMatch(app.innerHTML, /<iframe\b/);
});
