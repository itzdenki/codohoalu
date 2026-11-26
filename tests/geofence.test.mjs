import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HOA_LU_CENTER,
  MAX_RADIUS_METERS,
  distanceMeters,
  evaluateLocation,
  formatDistanceKm,
  startGeofenceWatcher,
} from '../public/assets/js/geofence.js';

test('tính đúng khoảng cách Haversine và giới hạn bán kính 5 km quanh Cố đô Hoa Lư', () => {
  assert.equal(MAX_RADIUS_METERS, 5000);

  // Ngay tại Đền Vua Đinh Tiên Hoàng (~120 m từ tâm)
  const atDinhTemple = evaluateLocation({ latitude: 20.28461, longitude: 105.90514, accuracy: 20 });
  assert.equal(atDinhTemple.allowed, true);
  assert.ok(atDinhTemple.distanceMeters < 300);

  // Khu vực Tràng An (~3.2 km) -> vẫn trong 5 km
  const atTrangAn = evaluateLocation({ latitude: 20.2565, longitude: 105.9056, accuracy: 30 });
  assert.equal(atTrangAn.allowed, true);
  assert.ok(atTrangAn.distanceMeters > 3000 && atTrangAn.distanceMeters < 4000);

  // Ngoài 5 km (TP Ninh Bình ~8.5 km) -> tự động khóa
  const atNinhBinhCity = evaluateLocation({ latitude: 20.2506, longitude: 105.9745, accuracy: 30 });
  assert.equal(atNinhBinhCity.allowed, false);
  assert.ok(atNinhBinhCity.distanceMeters > 7000);

  // Hà Nội (~82 km) -> chắc chắn khóa
  const atHanoi = evaluateLocation({ latitude: 21.0285, longitude: 105.8542, accuracy: 50 });
  assert.equal(atHanoi.allowed, false);
  assert.ok(distanceMeters(HOA_LU_CENTER, { lat: 21.0285, lng: 105.8542 }) > 80_000);

  assert.equal(formatDistanceKm(5420, 'vi'), '5,4');
  assert.equal(formatDistanceKm(5420, 'en'), '5.4');
});

test('bộ theo dõi vị trí tự động tắt khi rời khỏi bán kính 5 km và mở lại khi quay về', (t) => {
  const originalNav = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  t.after(() => {
    if (originalNav) Object.defineProperty(globalThis, 'navigator', originalNav);
    else delete globalThis.navigator;
  });

  let onWatchPos = null;
  let onWatchErr = null;
  let clearedId = null;

  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: {
      geolocation: {
        watchPosition(ok, err) { onWatchPos = ok; onWatchErr = err; return 42; },
        getCurrentPosition() {},
        clearWatch(id) { clearedId = id; },
      },
    },
  });

  const events = [];
  const watcher = startGeofenceWatcher({ onStatus: (s) => events.push(s) });

  // 1. Inside Hoa Lu -> allowed
  onWatchPos({ coords: { latitude: 20.2856, longitude: 105.9056, accuracy: 15 } });
  assert.equal(events.at(-1).allowed, true);
  assert.equal(events.at(-1).reason, 'ok');

  // 2. Temporary GPS timeout inside temple -> transientError (does NOT lock)
  onWatchErr({ code: 3 });
  assert.equal(events.at(-1).transientError, true);

  // 3. Move 6 km away -> automatically locks out_of_range
  onWatchPos({ coords: { latitude: 20.3400, longitude: 105.9056, accuracy: 20 } });
  assert.equal(events.at(-1).allowed, false);
  assert.equal(events.at(-1).reason, 'out_of_range');
  assert.ok(events.at(-1).distanceMeters > 5500);

  // 4. Return within 5 km -> unlocks
  onWatchPos({ coords: { latitude: 20.2900, longitude: 105.9056, accuracy: 20 } });
  assert.equal(events.at(-1).allowed, true);

  // 5. Permission denied -> locks with reason 'denied'
  onWatchErr({ code: 1 });
  assert.equal(events.at(-1).allowed, false);
  assert.equal(events.at(-1).reason, 'denied');

  watcher.stop();
  assert.equal(clearedId, 42);
});
