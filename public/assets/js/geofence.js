export const HOA_LU_CENTER = { lat: 20.2856, lng: 105.9056 };
export const MAX_RADIUS_METERS = 5000; // 5 km
const EARTH_RADIUS_METERS = 6_371_000;
const MAX_ACCURACY_CUSHION_METERS = 350;

const GEO_COPY = {
  vi: {
    outTitle: 'Ngoài phạm vi sử dụng',
    outBadge: 'Bán kính 5 km quanh Cố đô Hoa Lư',
    outDesc: 'Ứng dụng thuyết minh tự động tắt khi bạn rời khỏi Khu di tích Cố đô Hoa Lư quá 5 km. Vui lòng quay lại khu vực di tích để tiếp tục sử dụng.',
    distanceText: (km) => `Vị trí hiện tại cách Cố đô Hoa Lư khoảng ${km} km`,
    deniedTitle: 'Cần cấp quyền vị trí',
    deniedBadge: 'Giới hạn trong bán kính 5 km quanh Cố đô Hoa Lư',
    deniedDesc: 'Vui lòng bật định vị (GPS) và cho phép trình duyệt truy cập vị trí để xác nhận bạn đang ở trong khu vực Cố đô Hoa Lư.',
    recheckBtn: 'Kiểm tra lại vị trí',
    checking: 'Đang xác định vị trí...',
  },
  en: {
    outTitle: 'Outside Service Area',
    outBadge: '5 km radius around Hoa Lu Ancient Capital',
    outDesc: 'The audio guide automatically turns off when you move more than 5 km away from Hoa Lu Ancient Capital. Please return within the 5 km zone to continue.',
    distanceText: (km) => `Current distance from Hoa Lu: approx. ${km} km`,
    deniedTitle: 'Location Access Required',
    deniedBadge: 'Limited to 5 km around Hoa Lu Ancient Capital',
    deniedDesc: 'Please enable GPS and allow location access in your browser to verify you are within 5 km of Hoa Lu Ancient Capital.',
    recheckBtn: 'Check location again',
    checking: 'Checking your location...',
  },
  fr: {
    outTitle: 'Hors zone de service',
    outBadge: 'Rayon de 5 km autour de Hoa Lư',
    outDesc: 'Le guide audio s’arrête automatiquement au-delà de 5 km de l’Ancienne Capitale Hoa Lư. Veuillez revenir dans la zone pour continuer.',
    distanceText: (km) => `Distance actuelle de Hoa Lư : environ ${km} km`,
    deniedTitle: 'Autorisation de localisation requise',
    deniedBadge: 'Limité à 5 km autour de Hoa Lư',
    deniedDesc: 'Veuillez activer le GPS et autoriser l’accès à votre position pour confirmer que vous êtes dans un rayon de 5 km.',
    recheckBtn: 'Vérifier la position',
    checking: 'Localisation en cours...',
  },
  ko: {
    outTitle: '이용 가능 범위 밖입니다',
    outBadge: '호아루 고도 반경 5km 이내',
    outDesc: '호아루 고도 유적지에서 5km 이상 벗어나면 오디오 가이드가 자동으로 종료됩니다. 계속 이용하시려면 5km 반경 내로 돌아와 주세요.',
    distanceText: (km) => `현재 호아루 고도와의 거리: 약 ${km} km`,
    deniedTitle: '위치 권한이 필요합니다',
    deniedBadge: '호아루 고도 반경 5km 제한',
    deniedDesc: '호아루 고도 반경 5km 이내에 있는지 확인하려면 GPS를 켜고 브라우저의 위치 권한을 허용해 주세요.',
    recheckBtn: '위치 다시 확인',
    checking: '위치를 확인하는 중...',
  },
  zh: {
    outTitle: '超出使用范围',
    outBadge: '华闾古都周边 5 公里以内',
    outDesc: '离开华闾古都景区超过 5 公里后，语音导览将自动关闭。返回 5 公里范围内即可继续使用。',
    distanceText: (km) => `当前距离华闾古都约 ${km} 公里`,
    deniedTitle: '需要位置权限',
    deniedBadge: '仅限华闾古都周边 5 公里内使用',
    deniedDesc: '请开启定位（GPS）并允许浏览器访问位置信息，以验证您位于华闾古都 5 公里范围内。',
    recheckBtn: '重新检测位置',
    checking: '正在获取位置...',
  },
  ja: {
    outTitle: '利用可能エリア外です',
    outBadge: 'ホアルー古都から半径5km以内',
    outDesc: 'ホアルー古都から5km以上離れると音声ガイドは自動的に停止します。5km圏内に戻ってから再度お試しください。',
    distanceText: (km) => `ホアルー古都からの現在距離：約 ${km} km`,
    deniedText: '',
    deniedTitle: '位置情報の許可が必要です',
    deniedBadge: 'ホアルー古都から半径5km制限',
    deniedDesc: 'ホアルー古都から5km以内にいることを確認するため、GPSを有効にして位置情報へのアクセスを許可してください。',
    recheckBtn: '位置を再確認',
    checking: '位置情報を取得中...',
  },
};

export const geofenceCopy = (lang) => GEO_COPY[lang] || GEO_COPY.vi;

export function distanceMeters(a, b) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const h = sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLng * sinLng;
  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function evaluateLocation(coords, center = HOA_LU_CENTER, maxRadius = MAX_RADIUS_METERS) {
  const lat = Number(coords?.latitude);
  const lng = Number(coords?.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  const accuracy = Number(coords?.accuracy);
  const rawMeters = distanceMeters({ lat, lng }, center);
  const cushion = Number.isFinite(accuracy) && accuracy > 0
    ? Math.min(accuracy, MAX_ACCURACY_CUSHION_METERS)
    : 0;
  const effectiveMeters = Math.max(0, rawMeters - cushion);
  return {
    allowed: effectiveMeters <= maxRadius,
    distanceMeters: rawMeters,
    effectiveMeters,
    distanceKm: rawMeters / 1000,
    accuracy: Number.isFinite(accuracy) ? accuracy : 0,
  };
}

export function formatDistanceKm(meters, lang = 'vi') {
  const km = (Math.max(0, meters) / 1000).toFixed(1);
  return lang === 'vi' || lang === 'fr' ? km.replace('.', ',') : km;
}

function getGeolocationApi() {
  try {
    if (typeof window !== 'undefined' && window.isSecureContext === false) return null;
    return globalThis.navigator?.geolocation || null;
  } catch {
    return null;
  }
}

export function startGeofenceWatcher({
  center = HOA_LU_CENTER,
  maxRadius = MAX_RADIUS_METERS,
  onStatus,
  pollMs = 45_000,
} = {}) {
  const geo = getGeolocationApi();
  if (!geo || typeof geo.getCurrentPosition !== 'function') {
    return { checkNow() {}, stop() {} };
  }

  let watchId = null;
  let timerId = null;
  let stopped = false;

  const handlePosition = (pos) => {
    if (stopped) return;
    const result = evaluateLocation(pos?.coords, center, maxRadius);
    if (!result) return;
    onStatus?.({
      allowed: result.allowed,
      reason: result.allowed ? 'ok' : 'out_of_range',
      distanceMeters: result.distanceMeters,
      accuracy: result.accuracy,
    });
  };

  const handleError = (err) => {
    if (stopped) return;
    // Code 1 = PERMISSION_DENIED; temporary GPS timeouts (code 2/3) inside temples do not kick out visitors.
    if (err?.code === 1) {
      onStatus?.({ allowed: false, reason: 'denied', distanceMeters: null });
    } else {
      onStatus?.({ transientError: true });
    }
  };

  const options = { enableHighAccuracy: true, maximumAge: 15_000, timeout: 15_000 };

  function checkNow() {
    if (stopped) return;
    try {
      geo.getCurrentPosition(handlePosition, handleError, options);
    } catch { /* geolocation unavailable */ }
  }

  try {
    if (typeof geo.watchPosition === 'function') {
      watchId = geo.watchPosition(handlePosition, handleError, options);
    }
  } catch { /* fall back to polling */ }

  checkNow();

  if (typeof globalThis.window?.setInterval === 'function') {
    timerId = globalThis.window.setInterval(checkNow, pollMs);
  }
  const onVisible = () => {
    if (!globalThis.document?.hidden) checkNow();
  };
  globalThis.document?.addEventListener?.('visibilitychange', onVisible);
  globalThis.window?.addEventListener?.('focus', checkNow);

  function stop() {
    stopped = true;
    if (watchId !== null && typeof geo.clearWatch === 'function') {
      try { geo.clearWatch(watchId); } catch { /* ignore */ }
      watchId = null;
    }
    if (timerId !== null) {
      globalThis.window?.clearInterval?.(timerId);
      timerId = null;
    }
    globalThis.document?.removeEventListener?.('visibilitychange', onVisible);
    globalThis.window?.removeEventListener?.('focus', checkNow);
  }

  return { checkNow, stop };
}
