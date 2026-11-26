export const SESSION_DURATION_MS = 60 * 60 * 1000; // 1 hour (60 minutes)
export const SESSION_KEY = 'hoalu_session_expires_at';
export const SESSION_WARN_MS = 5 * 60 * 1000; // Highlight when <= 5 minutes left

const SESSION_COPY = {
  vi: {
    timerLabel: 'Thời gian còn lại của phiên',
    expiredTitle: 'Phiên hoạt động đã hết hạn',
    expiredSubtitle: 'Giới hạn 60 phút / phiên',
    expiredDesc: 'Mỗi phiên trải nghiệm thuyết minh Cố đô Hoa Lư có hiệu lực trong 1 tiếng (60 phút). Vui lòng quét lại mã QR tại khu di tích để bắt đầu phiên mới.',
    rescanBtn: 'Quét mã QR để bắt đầu phiên mới',
    invalidRescan: 'Mã QR không hợp lệ. Hãy quét đúng mã QR của Cố đô Hoa Lư (trang chủ hoặc 14 mục nội dung) để gia hạn phiên.',
    renewed: 'Đã kích hoạt phiên mới (60 phút)!',
  },
  en: {
    timerLabel: 'Session time remaining',
    expiredTitle: 'Session Expired',
    expiredSubtitle: '1-hour session limit',
    expiredDesc: 'Each Hoa Lu Ancient Capital audio guide session is valid for 1 hour (60 minutes). Please scan a Hoa Lu QR code again to start a new session.',
    rescanBtn: 'Scan QR to start a new session',
    invalidRescan: 'Invalid QR code. Please scan an official Hoa Lu QR code (Home or any of the 14 exhibits) to renew your session.',
    renewed: 'New 60-minute session started!',
  },
  fr: {
    timerLabel: 'Temps restant de la session',
    expiredTitle: 'Session expirée',
    expiredSubtitle: 'Limite de 60 minutes par session',
    expiredDesc: 'Chaque session du guide audio de Hoa Lư est valable pendant 1 heure (60 minutes). Veuillez scanner de nouveau un QR code du site pour démarrer une nouvelle session.',
    rescanBtn: 'Scanner un QR code pour continuer',
    invalidRescan: 'QR code invalide. Scannez un QR code officiel de Hoa Lư (accueil ou l’un des 14 thèmes) pour renouveler la session.',
    renewed: 'Nouvelle session de 60 minutes activée !',
  },
  ko: {
    timerLabel: '남은 이용 시간',
    expiredTitle: '이용 시간이 만료되었습니다',
    expiredSubtitle: '세션당 1시간(60분) 제한',
    expiredDesc: '호아루 고도 오디오 가이드는 1회 세션당 1시간(60분) 동안 이용할 수 있습니다. 새 세션을 시작하려면 유적지 QR 코드를 다시 스캔해 주세요.',
    rescanBtn: 'QR 코드를 스캔하여 새 세션 시작',
    invalidRescan: '유효하지 않은 QR 코드입니다. 호아루 공식 QR 코드(홈 또는 14개 해설 주제)를 스캔해 주세요.',
    renewed: '새 세션(60분)이 시작되었습니다!',
  },
  zh: {
    timerLabel: '当前会话剩余时间',
    expiredTitle: '访问会话已过期',
    expiredSubtitle: '每次会话限时 60 分钟',
    expiredDesc: '华闾古都语音导览每次会话有效期为 1 小时（60 分钟）。请重新扫描景区二维码以开启新的访问会话。',
    rescanBtn: '扫描二维码开启新会话',
    invalidRescan: '二维码无效。请扫描华闾古都官方二维码（首页或 14 个讲解点之一）以重新激活会话。',
    renewed: '已开启新会话（60 分钟）！',
  },
  ja: {
    timerLabel: 'セッション残り時間',
    expiredTitle: 'セッションの有効期限が切れました',
    expiredSubtitle: '1セッション60分制限',
    expiredDesc: 'ホアルー古都音声ガイドの1回の利用時間は1時間（60分）です。続けるには遺跡のQRコードを再度スキャンしてください。',
    rescanBtn: 'QRコードをスキャンして再開',
    invalidRescan: '無効なQRコードです。ホアルー公式QRコード（ホームまたは14件の解説）をスキャンしてください。',
    renewed: '新しいセッション（60分）を開始しました！',
  },
};

export const sessionCopy = (lang) => SESSION_COPY[lang] || SESSION_COPY.vi;

function safeGet(storage, key) {
  try { return storage?.getItem?.(key) ?? null; }
  catch { return null; }
}

function safeSet(storage, key, value) {
  try { storage?.setItem?.(key, String(value)); return true; }
  catch { return false; }
}

export function readSessionExpiry(storage = globalThis.localStorage) {
  const raw = safeGet(storage, SESSION_KEY);
  if (raw === null || raw === '') return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export function startSession(now = Date.now(), storage = globalThis.localStorage) {
  const expiresAt = now + SESSION_DURATION_MS;
  safeSet(storage, SESSION_KEY, expiresAt);
  return expiresAt;
}

export function ensureSession({ now = Date.now(), storage = globalThis.localStorage, renew = false } = {}) {
  if (renew) {
    const expiresAt = startSession(now, storage);
    return { active: true, expiresAt, remainingMs: SESSION_DURATION_MS };
  }
  const existing = readSessionExpiry(storage);
  if (existing === null) {
    const expiresAt = startSession(now, storage);
    return { active: true, expiresAt, remainingMs: SESSION_DURATION_MS };
  }
  const remainingMs = Math.max(0, existing - now);
  return { active: remainingMs > 0, expiresAt: existing, remainingMs };
}

export function formatRemaining(ms) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
