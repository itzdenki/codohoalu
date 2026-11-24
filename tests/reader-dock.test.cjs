const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const script = fs.readFileSync(path.join(__dirname, '../public/pages/tham-quan/_shared/reader.js'), 'utf8');

function element() {
  const listeners = {};
  const attributes = {};
  return {
    listeners, attributes, innerHTML: '', textContent: '', hidden: false,
    style: { properties: {}, setProperty(name, value) { this.properties[name] = value; } },
    setAttribute(name, value) { attributes[name] = value; },
    addEventListener(name, callback) { (listeners[name] ||= []).push(callback); },
    emit(name) { for (const callback of listeners[name] || []) callback({}); },
    remove() { this.removed = true; },
  };
}

function startReader({ hasAudio = true, embedded = true, supportsObserver = true, language = 'vi', failCreation = false } = {}) {
  const classes = new Set();
  const properties = new Map();
  const listeners = {};
  let observerCallback;
  let height = 76.2;
  const controls = { play: element(), mute: element(), seek: element(), current: element(), duration: element() };
  const player = element();
  player.querySelector = selector => ({
    '.reader-player-play': controls.play, '.reader-player-mute': controls.mute,
    '.reader-player-seek': controls.seek, '.reader-player-current': controls.current,
    '.reader-player-duration': controls.duration,
  })[selector];
  const status = element();
  const dock = {
    children: [], getBoundingClientRect: () => ({ height }),
    insertBefore(child) { this.children.push(child); },
    appendChild(child) { this.children.push(child); },
    querySelector(selector) { return this.children.find(child => `.${child.className}` === selector && !child.removed); },
  };
  const audio = element();
  Object.assign(audio, { paused: true, duration: NaN, currentTime: 0, error: null, controls: true, preload: 'none' });
  let muted = false, volume = 1;
  Object.defineProperties(audio, {
    muted: { get: () => muted, set(value) { muted = value; audio.emit('volumechange'); } },
    volume: { get: () => volume, set(value) { volume = value; audio.emit('volumechange'); } },
  });
  audio.closest = () => dock;
  audio.play = () => {
    if (audio.playError) return Promise.reject(audio.playError);
    audio.paused = false; audio.emit('play'); return Promise.resolve();
  };
  audio.pause = () => { audio.paused = true; audio.emit('pause'); };
  audio.load = () => { audio.error = null; };
  const document = {
    body: { classList: { add: name => classes.add(name) } },
    documentElement: { lang: language, style: { setProperty: (name, value) => properties.set(name, value) } },
    querySelector: selector => selector === '.reader-audio audio' && hasAudio ? audio : null,
    querySelectorAll: () => [],
    createElement: tag => {
      if (failCreation) throw new Error('unavailable');
      return tag === 'div' ? player : status;
    },
  };
  const window = { addEventListener: (name, callback) => { listeners[name] = callback; } };
  window.parent = embedded ? {} : window;
  const context = { window, document, location: { search: '', origin: 'http://localhost:3000' }, URLSearchParams };
  if (supportsObserver) context.ResizeObserver = class {
    constructor(callback) { observerCallback = callback; }
    observe(target) { assert.equal(target, dock); }
  };
  vm.runInNewContext(script, context);
  return { classes, properties, listeners, controls, audio, status, player, dock, resize: value => { height = value; }, notifyObserver: () => observerCallback() };
}

test('trình phát chừa đủ chỗ khi thanh audio thay đổi chiều cao', () => {
  const reader = startReader();
  assert.ok(reader.classes.has('has-audio'));
  assert.ok(reader.classes.has('embedded'));
  assert.equal(reader.properties.get('--audio-dock-height'), '77px');
  reader.resize(112.4);
  reader.notifyObserver();
  assert.equal(reader.properties.get('--audio-dock-height'), '113px');
});

test('trang không audio không chừa chỗ thừa; trình duyệt cũ cập nhật khi đổi kích thước', () => {
  const withoutAudio = startReader({ hasAudio: false, embedded: false, supportsObserver: false });
  assert.ok(!withoutAudio.classes.has('has-audio'));
  assert.equal(withoutAudio.properties.size, 0);
  const fallback = startReader({ embedded: false, supportsObserver: false });
  fallback.resize(96);
  fallback.listeners.resize();
  assert.equal(fallback.properties.get('--audio-dock-height'), '96px');
});

test('nút phát, tạm dừng, tua và âm lượng điều khiển đúng audio', () => {
  const { audio, controls, player } = startReader();
  assert.equal(audio.hidden, true);
  assert.equal(audio.preload, 'metadata');
  assert.equal(player.attributes.role, 'group');
  assert.equal(controls.play.attributes['aria-label'], 'Tạm dừng');
  assert.equal(controls.seek.disabled, true);
  audio.duration = 142.8;
  audio.emit('loadedmetadata');
  assert.equal(controls.duration.textContent, '2:22');
  assert.equal(controls.seek.disabled, false);
  controls.play.emit('click');
  assert.equal(audio.paused, true);
  controls.play.emit('click');
  assert.equal(audio.paused, false);
  assert.equal(controls.play.attributes['aria-label'], 'Tạm dừng');
  controls.seek.value = '37.5';
  controls.seek.emit('input');
  assert.equal(audio.currentTime, 37.5);
  assert.equal(controls.current.textContent, '0:37');
  assert.equal(controls.seek.attributes['aria-valuetext'], '0:37 / 2:22');
  controls.mute.emit('click');
  assert.equal(audio.muted, true);
  assert.equal(controls.mute.attributes['aria-label'], 'Bật tiếng');
  controls.mute.emit('click');
  assert.equal(audio.muted, false);
  controls.play.emit('click');
  assert.equal(audio.paused, true);
});

test('audio lỗi có thông báo và có thể thử lại; nếu không dựng được UI vẫn có bộ phát gốc', async () => {
  const { audio, controls, status } = startReader({ language: 'en' });
  controls.play.emit('click');
  audio.playError = new Error('blocked');
  controls.play.emit('click');
  await Promise.resolve();
  assert.equal(status.hidden, false);
  assert.match(status.textContent, /Unable to play/);
  audio.playError = null;
  controls.play.emit('click');
  assert.equal(status.hidden, true);
  assert.equal(audio.paused, false);
  const fallback = startReader({ failCreation: true });
  assert.equal(fallback.audio.hidden, false);
  assert.equal(fallback.audio.controls, true);
});
