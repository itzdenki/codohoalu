import test from 'node:test';
import assert from 'node:assert/strict';
import { pages, pathFor, resolveRoute } from '../public/assets/js/routes.js';
import { HOTSPOTS_DTH, HOTSPOTS_LDH } from '../public/assets/js/hotspots.js';
import { VISIT_TOPICS } from '../public/assets/js/visit-topics.js';

test('đường dẫn của từng mục được khôi phục đúng sau khi tải lại', () => {
  for (const mode of ['home', 'dth', 'ldh', 'photo-spots', ...Object.keys(pages)]) {
    const path = pathFor(mode);
    assert.deepEqual(resolveRoute(path), { mode, spot: null });
    assert.deepEqual(resolveRoute(path + '/'), { mode, spot: null });
  }
});

test('đường dẫn của từng điểm tham quan giữ lại sơ đồ và điểm được chọn', () => {
  for (const spot of [...HOTSPOTS_DTH, ...HOTSPOTS_LDH]) {
    assert.equal(pathFor(spot.temple, spot), `/${spot.route}`);
    assert.deepEqual(resolveRoute(`/${spot.route}`), { mode: spot.temple, spot });
  }
});

test('mười bốn mục thuyết minh có đường dẫn riêng và khôi phục đúng khi tải lại', () => {
  assert.equal(VISIT_TOPICS.length, 14);
  assert.equal(new Set(VISIT_TOPICS.map(topic => topic.route)).size, 14);
  for (const visit of VISIT_TOPICS) {
    const path = `/pages/tham-quan/${visit.slug}`;
    assert.equal(visit.route, path.slice(1));
    assert.equal(pathFor('visit', null, visit), path);
    assert.deepEqual(resolveRoute(path), { mode: 'visit', spot: null, visit });
    assert.deepEqual(resolveRoute(path + '/'), { mode: 'visit', spot: null, visit });
  }
  assert.deepEqual(resolveRoute('/pages/tham-quan/does-not-exist'), { mode: 'home', spot: null });
  assert.deepEqual(resolveRoute(`/pages/tham-quan/${VISIT_TOPICS[0].slug}/index_vi.html`), { mode: 'home', spot: null });
  assert.equal(pathFor('visit'), '/');
  assert.equal(pathFor('visit', null, { route: 'pages/tham-quan/does-not-exist' }), '/');
});

test('trang di tích bổ sung vẫn có thể mở và đường dẫn không hợp lệ về trang chủ', () => {
  const result = resolveRoute('/pages/ldh/toa-bai-duong');
  assert.equal(result.mode, 'ldh');
  assert.equal(result.spot.route, 'pages/ldh/toa-bai-duong');
  assert.deepEqual(resolveRoute('/not-a-page'), { mode: 'home', spot: null });
  assert.deepEqual(resolveRoute('/pages/ldh/toa-bai-duong/index.html'), { mode: 'home', spot: null });
});
