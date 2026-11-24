const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createServer } = require('../server.cjs');

test('đường dẫn ứng dụng mở được trực tiếp và không thay thế tệp nội dung', async (t) => {
  const server = createServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  for (const route of ['/pages/dth/so-do', '/pages/ldh/so-do/', '/pages/ldh/den-tho-vua?qr=hoalu', '/pages/dth/gioi-thieu', '/pages/photo-spots']) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    assert.match(await response.text(), /<main id="app"/);
  }
  const embedded = await fetch(base + '/pages/ldh/so-do/index.html?notopbar=1');
  assert.equal(embedded.status, 200);
  assert.match(await embedded.text(), /le-map-list/);
  const dinhMap = await fetch(base + '/pages/dth/so-do/index_vi.html?notopbar=1');
  assert.equal(dinhMap.status, 200);
  assert.match(await dinhMap.text(), /dinh-map-key/);
  for (const asset of ['/assets/js/dinh-map.js', '/assets/css/dinh-map.css', '/pages/dth/so-do/bg1.jpg', '/assets/css/home.css', '/images/home/cover-art.jpg', '/images/home/header.png', '/images/home/title.png', '/images/stories/le-3-thien-phuc-dao-kenh.jpg', '/images/menu/header-banner.png', '/images/menu/footer-lotus.png', '/qr-access.png']) {
    assert.equal((await fetch(base + asset, { method: 'HEAD' })).status, 200, asset);
  }
  assert.equal((await fetch(base + '/pages/ldh/does-not-exist')).status, 404);
  const audio = await fetch(base + '/pages/ldh/den-tho-vua/audio_vi.mp3', { headers: { Range: 'bytes=0-99' } });
  assert.equal(audio.status, 206);
  assert.equal((await audio.arrayBuffer()).byteLength, 100);
});

test('cả mười bốn đường dẫn tham quan mở ứng dụng và giữ các bản nội dung riêng', async (t) => {
  const { VISIT_TOPICS } = await import('../public/assets/js/visit-topics.js');
  assert.equal(VISIT_TOPICS.length, 14);
  const server = createServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  const languages = { vi: 'vi', en: 'en', fr: 'fr', kr: 'ko', cn: 'zh-Hans', jp: 'ja' };
  for (const topic of VISIT_TOPICS) {
    for (const ending of ['', '/?lang=vi']) {
      const route = `/${topic.route}${ending}`;
      const response = await fetch(base + route);
      assert.equal(response.status, 200, route);
      assert.match(await response.text(), /<main id="app"/, route);
    }
    for (const [suffix, lang] of Object.entries(languages)) {
      const route = `/${topic.route}/index_${suffix}.html?notopbar=1`;
      const response = await fetch(base + route);
      assert.equal(response.status, 200, route);
      const html = await response.text();
      assert.match(html, new RegExp(`<html lang="${lang}"`), route);
      assert.doesNotMatch(html, /<main id="app"/, route);
      assert.doesNotMatch(html, /<section class="reader-audio">\s*<p>/, route);
    }
  }
  assert.equal((await fetch(base + '/pages/tham-quan/does-not-exist')).status, 404);
});

test('mỗi mục tham quan có bản thuyết minh tiếng Việt riêng và có thể phát theo khoảng byte', async (t) => {
  const { VISIT_TOPICS } = await import('../public/assets/js/visit-topics.js');
  const server = createServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  for (const topic of VISIT_TOPICS) {
    const audioPath = `/${topic.route}/audio_vi.mp3`;
    for (const page of ['index.html', 'index_vi.html']) {
      const response = await fetch(`${base}/${topic.route}/${page}`);
      assert.equal(response.status, 200);
      const html = await response.text();
      assert.ok(html.includes(`src="${audioPath}"`), `${topic.id}: ${page}`);
      assert.equal((html.match(/<audio\b/g) || []).length, 1, `${topic.id}: ${page}`);
    }
    const audio = await fetch(base + audioPath, { headers: { Range: 'bytes=0-127' } });
    assert.equal(audio.status, 206, topic.id);
    assert.match(audio.headers.get('content-type'), /^audio\/mpeg/);
    assert.equal((await audio.arrayBuffer()).byteLength, 128);
    const file = path.join(__dirname, '..', 'public', topic.route, 'audio_vi.mp3');
    const bytes = fs.readFileSync(file);
    const start = Math.floor(bytes.length / 2);
    const seek = await fetch(base + audioPath, { headers: { Range: `bytes=${start}-${start + 127}` } });
    assert.equal(seek.status, 206, `${topic.id}: seek`);
    assert.equal(seek.headers.get('content-range'), `bytes ${start}-${start + 127}/${bytes.length}`);
    assert.deepEqual(Buffer.from(await seek.arrayBuffer()), bytes.subarray(start, start + 128));
  }
});

test('mỗi trang có sáu tệp ngôn ngữ và có thể mở trực tiếp', async (t) => {
  const root = path.join(__dirname, '..', 'public', 'pages');
  const languages = { vi: 'vi', en: 'en', kr: 'ko', fr: 'fr', cn: 'zh-Hans', jp: 'ja' };
  for (const temple of ['dth', 'ldh', 'tham-quan']) {
    for (const entry of fs.readdirSync(path.join(root, temple), { withFileTypes: true })) {
      const directory = path.join(root, temple, entry.name);
      if (!entry.isDirectory() || !fs.existsSync(path.join(directory, 'index.html'))) continue;
      for (const [suffix, lang] of Object.entries(languages)) {
        const filename = path.join(directory, `index_${suffix}.html`);
        assert.ok(fs.existsSync(filename), filename);
        assert.match(fs.readFileSync(filename, 'utf8'), new RegExp(`<html lang="${lang}"`));
      }
    }
  }
  const server = createServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  for (const [suffix, lang] of Object.entries(languages)) {
    const response = await fetch(`${base}/pages/dth/gioi-thieu/index_${suffix}.html`);
    assert.equal(response.status, 200);
    assert.match(await response.text(), new RegExp(`<html lang="${lang}"`));
  }
});
