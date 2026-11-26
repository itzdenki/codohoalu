import { VISIT_TOPICS, visitTitle } from './visit-topics.js';

const QR_COPY = {
  vi: {
    homeModalTitle: 'Quét mã QR tham quan',
    tabScan: 'Quét mã QR',
    tabHomeQr: 'QR Trang chủ',
    scanHint: 'Đưa camera vào mã QR tại 14 điểm nội dung để mở nhanh bài thuyết minh.',
    startingCamera: 'Đang yêu cầu quyền mở camera...',
    scanning: 'Đang quét mã QR...',
    enableCamera: 'Cho phép & Mở camera',
    chooseImage: 'Chọn ảnh mã QR từ máy',
    retry: 'Quét lại',
    insecureContext: 'Trình duyệt chỉ cho phép mở camera qua HTTPS (hoặc localhost). Hãy mở bằng https://codohoalu.pages.dev hoặc chọn ảnh QR bên dưới.',
    permissionDenied: 'Bạn chưa cấp quyền camera. Hãy bấm "Cho phép" khi trình duyệt hỏi (hoặc bật Camera trong biểu tượng ổ khóa trên thanh địa chỉ) rồi bấm nút Mở camera.',
    noCameraFound: 'Không tìm thấy camera trên thiết bị này. Bạn có thể dùng nút chọn ảnh mã QR bên dưới.',
    cameraBusy: 'Camera đang được ứng dụng hoặc tab khác sử dụng. Hãy đóng rồi bấm Mở camera lại.',
    cameraError: 'Không mở được camera. Hãy bấm nút "Cho phép & Mở camera" bên dưới hoặc chọn ảnh mã QR từ máy.',
    invalidQr: 'Mã QR không hợp lệ hoặc không thuộc 14 mục nội dung thuyết minh Cố đô Hoa Lư.',
    noQrInImage: 'Không tìm thấy mã QR nào trong ảnh đã chọn. Vui lòng thử ảnh rõ hơn.',
    matched: (name) => `Đã nhận diện: ${name}`,
    homeQrDesc: 'Quét mã này để mở nhanh trang chủ ứng dụng thuyết minh Cố đô Hoa Lư.',
    topicQrTitle: 'Mã QR mục nội dung',
    topicQrDesc: 'Quét mã QR này từ trang chủ hoặc camera điện thoại để mở trực tiếp mục thuyết minh này.',
    downloadQr: 'Tải ảnh mã QR',
    qrButton: 'QR',
    qrButtonLabel: 'Xem mã QR của mục này',
  },
  en: {
    homeModalTitle: 'Scan Audio Guide QR',
    tabScan: 'Scan QR',
    tabHomeQr: 'Home QR',
    scanHint: 'Point your camera at any of the 14 exhibit QR codes to open its audio guide.',
    startingCamera: 'Requesting camera permission...',
    scanning: 'Scanning for QR code...',
    enableCamera: 'Allow & Open Camera',
    chooseImage: 'Scan QR from image',
    retry: 'Scan again',
    insecureContext: 'Camera requires HTTPS (or localhost). Open https://codohoalu.pages.dev or upload a QR image below.',
    permissionDenied: 'Camera permission was denied. Allow camera access in your browser address bar, then tap "Allow & Open Camera".',
    noCameraFound: 'No camera detected on this device. You can choose a QR image from your device below.',
    cameraBusy: 'Camera is currently in use by another app or tab. Close it and tap Open Camera again.',
    cameraError: 'Could not open camera. Tap "Allow & Open Camera" below or choose a QR image from your device.',
    invalidQr: 'Invalid QR code. This code does not match any of the 14 Hoa Lu audio guide topics.',
    noQrInImage: 'No QR code found in the selected image. Please try a clearer image.',
    matched: (name) => `Matched: ${name}`,
    homeQrDesc: 'Scan this code to open the Hoa Lu Ancient Capital Audio Guide home page.',
    topicQrTitle: 'Topic QR Code',
    topicQrDesc: 'Scan this QR code from the home scanner or phone camera to jump directly to this topic.',
    downloadQr: 'Download QR image',
    qrButton: 'QR',
    qrButtonLabel: 'View QR code for this topic',
  },
  fr: {
    homeModalTitle: 'Scanner un QR Code',
    tabScan: 'Scanner QR',
    tabHomeQr: 'QR Accueil',
    scanHint: 'Dirigez la caméra vers l’un des 14 QR codes des thèmes pour ouvrir le guide audio.',
    startingCamera: 'Demande d’autorisation caméra...',
    scanning: 'Recherche d’un QR code...',
    enableCamera: 'Autoriser et ouvrir la caméra',
    chooseImage: 'Choisir une image QR',
    retry: 'Scanner à nouveau',
    insecureContext: 'La caméra nécessite HTTPS. Ouvrez https://codohoalu.pages.dev ou choisissez une image QR.',
    permissionDenied: 'Accès caméra refusé. Autorisez la caméra dans le navigateur puis réessayez.',
    noCameraFound: 'Aucune caméra détectée. Vous pouvez choisir une image QR ci-dessous.',
    cameraBusy: 'La caméra est utilisée par une autre application. Fermez-la puis réessayez.',
    cameraError: 'Impossible d’ouvrir la caméra. Réessayez ou sélectionnez une image QR ci-dessous.',
    invalidQr: 'QR code invalide : il ne correspond à aucun des 14 contenus du guide Hoa Lư.',
    noQrInImage: 'Aucun QR code détecté dans cette image. Veuillez réessayer.',
    matched: (name) => `Détecté : ${name}`,
    homeQrDesc: 'Scannez ce code pour ouvrir la page d’accueil du guide audio Hoa Lư.',
    topicQrTitle: 'QR Code du thème',
    topicQrDesc: 'Scannez ce QR code pour ouvrir directement ce contenu audio.',
    downloadQr: 'Télécharger le QR',
    qrButton: 'QR',
    qrButtonLabel: 'Voir le QR code de ce thème',
  },
  ko: {
    homeModalTitle: 'QR 코드 스캔',
    tabScan: 'QR 스캔',
    tabHomeQr: '홈 QR',
    scanHint: '14개 해설 주제 중 하나의 QR 코드를 카메라에 비추면 바로 이동합니다.',
    startingCamera: '카메라 권한을 요청하는 중...',
    scanning: 'QR 코드를 스캔하는 중...',
    enableCamera: '카메라 권한 허용 및 열기',
    chooseImage: '기기에서 QR 이미지 선택',
    retry: '다시 스캔',
    insecureContext: '카메라는 HTTPS에서만 사용할 수 있습니다. https://codohoalu.pages.dev에서 열어 주세요.',
    permissionDenied: '카메라 권한이 거부되었습니다. 브라우저 설정에서 카메라를 허용한 뒤 다시 눌러 주세요.',
    noCameraFound: '기기에서 카메라를 찾을 수 없습니다. 아래에서 QR 이미지를 선택해 주세요.',
    cameraBusy: '다른 앱에서 카메라를 사용 중입니다. 종료 후 다시 시도해 주세요.',
    cameraError: '카메라를 열 수 없습니다. 아래 버튼으로 권한을 요청하거나 QR 이미지를 선택해 주세요.',
    invalidQr: '유효하지 않은 QR 코드입니다. 14개 호아루 해설 콘텐츠와 일치하지 않습니다.',
    noQrInImage: '선택한 이미지에서 QR 코드를 찾지 못했습니다.',
    matched: (name) => `인식됨: ${name}`,
    homeQrDesc: '이 QR 코드를 스캔하면 호아루 고도 오디오 가이드 홈으로 이동합니다.',
    topicQrTitle: '콘텐츠 QR 코드',
    topicQrDesc: '홈 스캐너나 휴대폰 카메라로 이 QR 코드를 스캔하면 해당 해설로 바로 열립니다.',
    downloadQr: 'QR 이미지 저장',
    qrButton: 'QR',
    qrButtonLabel: '이 주제의 QR 코드 보기',
  },
  zh: {
    homeModalTitle: '扫描导览二维码',
    tabScan: '扫描二维码',
    tabHomeQr: '首页二维码',
    scanHint: '将摄像头对准 14 个讲解内容中的任意二维码即可直接跳转。',
    startingCamera: '正在请求摄像头权限...',
    scanning: '正在扫描二维码...',
    enableCamera: '授权并打开摄像头',
    chooseImage: '从相册选择二维码图片',
    retry: '重新扫描',
    insecureContext: '浏览器仅在 HTTPS 下允许开启摄像头，请访问 https://codohoalu.pages.dev 或上传二维码图片。',
    permissionDenied: '摄像头权限被拒绝。请在浏览器地址栏允许摄像头权限后重试。',
    noCameraFound: '未检测到摄像头设备，请使用下方按钮上传二维码图片。',
    cameraBusy: '摄像头正被其他应用占用，请关闭后重试。',
    cameraError: '无法打开摄像头，请点击下方“授权并打开摄像头”或上传二维码图片。',
    invalidQr: '二维码无效：不属于华闾古都 14 个语音讲解内容。',
    noQrInImage: '所选图片中未识别到二维码，请更换更清晰的图片重试。',
    matched: (name) => `已识别：${name}`,
    homeQrDesc: '扫描此二维码即可快速打开华闾古都语音导览首页。',
    topicQrTitle: '讲解内容二维码',
    topicQrDesc: '在首页扫码器或手机相机中扫描此二维码即可直达本讲解页。',
    downloadQr: '下载二维码图片',
    qrButton: 'QR',
    qrButtonLabel: '查看本页二维码',
  },
  ja: {
    homeModalTitle: 'QRコードをスキャン',
    tabScan: 'QRスキャン',
    tabHomeQr: 'ホームQR',
    scanHint: '14件の解説ページのQRコードをカメラにかざすと直接開きます。',
    startingCamera: 'カメラ権限をリクエスト中...',
    scanning: 'QRコードをスキャン中...',
    enableCamera: 'カメラを許可して開く',
    chooseImage: '端末からQR画像を選択',
    retry: '再スキャン',
    insecureContext: 'カメラはHTTPSでのみ利用できます。https://codohoalu.pages.dev で開いてください。',
    permissionDenied: 'カメラ権限が拒否されました。ブラウザでカメラを許可してから再度お試しください。',
    noCameraFound: 'カメラが見つかりません。下のボタンからQR画像を選択してください。',
    cameraBusy: 'カメラが他のアプリで使用中です。閉じてから再度お試しください。',
    cameraError: 'カメラを起動できません。下のボタンを押すかQR画像を選択してください。',
    invalidQr: '無効なQRコードです。14件のホアルー解説ページと一致しません。',
    noQrInImage: '選択した画像からQRコードを検出できませんでした。',
    matched: (name) => `一致: ${name}`,
    homeQrDesc: 'このQRコードをスキャンするとホアルー音声ガイドのホームが開きます。',
    topicQrTitle: '解説ページのQRコード',
    topicQrDesc: 'ホームのスキャナーやスマホカメラでスキャンするとこの解説へ直接移動します。',
    downloadQr: 'QR画像を保存',
    qrButton: 'QR',
    qrButtonLabel: 'この項目のQRコードを表示',
  },
};

export const qrCopy = (lang) => QR_COPY[lang] || QR_COPY.vi;

/**
 * Matches a decoded QR text against the 14 content pages (/pages/tham-quan/<slug>).
 * Rejects home QR, external URLs, arbitrary text, and unknown slugs.
 */
export function matchTopicFromQR(rawText, topics = VISIT_TOPICS) {
  if (typeof rawText !== 'string') return null;
  const text = rawText.trim();
  if (!text) return null;

  let pathname = '';
  try {
    if (/^https?:\/\//i.test(text)) {
      pathname = new URL(text).pathname;
    } else if (text.startsWith('/') || /^pages\/tham-quan\//i.test(text)) {
      pathname = new URL(text.startsWith('/') ? text : `/${text}`, 'https://codohoalu.pages.dev').pathname;
    } else {
      return null;
    }
  } catch {
    return null;
  }

  const match = /^\/pages\/tham-quan\/([a-z0-9-]+)\/?$/i.exec(pathname);
  if (!match) return null;
  const slug = match[1].toLowerCase();
  return topics.find((topic) => topic.slug === slug) || null;
}

/**
 * Matches any of the 15 official Hoa Lu QR codes (Home QR or 14 content QRs)
 * for renewing an expired 1-hour session.
 */
export function matchSiteQR(rawText, topics = VISIT_TOPICS) {
  const topic = matchTopicFromQR(rawText, topics);
  if (topic) return { kind: 'visit', topic };
  if (typeof rawText !== 'string') return null;
  const text = rawText.trim();
  if (!text) return null;
  try {
    if (/^https?:\/\//i.test(text)) {
      const url = new URL(text);
      const isHomePath = url.pathname === '/' || url.pathname === '/index.html';
      const isKnownHost = url.hostname === 'codohoalu.pages.dev'
        || url.hostname === 'localhost'
        || url.hostname === '127.0.0.1'
        || (typeof location !== 'undefined' && url.hostname === location.hostname);
      if (isHomePath && isKnownHost) return { kind: 'home', topic: null };
    } else if (text === '/' || text === '/index.html') {
      return { kind: 'home', topic: null };
    }
  } catch {
    return null;
  }
  return null;
}

let jsQRPromise = null;
export function loadJsQR() {
  if (typeof window !== 'undefined' && typeof window.jsQR === 'function') {
    return Promise.resolve(window.jsQR);
  }
  if (!jsQRPromise) {
    jsQRPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '/assets/js/vendor/jsqr.js';
      script.async = true;
      script.onload = () => {
        if (typeof window.jsQR === 'function') resolve(window.jsQR);
        else reject(new Error('jsQR failed to initialize'));
      };
      script.onerror = () => reject(new Error('Failed to load jsQR decoder'));
      document.head.appendChild(script);
    });
  }
  return jsQRPromise;
}

async function decodeCanvas(canvas, ctx, detector) {
  if (detector) {
    try {
      const codes = await detector.detect(canvas);
      if (codes?.length && codes[0].rawValue) return codes[0].rawValue;
    } catch { /* fall back to jsQR */ }
  }
  const jsQR = await loadJsQR();
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const decoded = jsQR(imageData.data, imageData.width, imageData.height, {
    inversionAttempts: 'attemptBoth',
  });
  return decoded?.data || null;
}

export async function decodeQRFromFile(file) {
  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('Invalid image'));
      el.src = objectUrl;
    });
    const maxDim = 1200;
    const scale = Math.min(1, maxDim / Math.max(img.naturalWidth || 1, img.naturalHeight || 1));
    const width = Math.max(1, Math.round(img.naturalWidth * scale));
    const height = Math.max(1, Math.round(img.naturalHeight * scale));
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    let detector = null;
    if (typeof window !== 'undefined' && 'BarcodeDetector' in window) {
      try {
        const supported = await window.BarcodeDetector.getSupportedFormats?.();
        if (!supported || supported.includes('qr_code')) {
          detector = new window.BarcodeDetector({ formats: ['qr_code'] });
        }
      } catch { detector = null; }
    }
    return await decodeCanvas(canvas, ctx, detector);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function requestMediaStream(constraints) {
  if (navigator.mediaDevices?.getUserMedia) {
    return navigator.mediaDevices.getUserMedia(constraints);
  }
  const legacy = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  if (legacy) {
    return new Promise((resolve, reject) => legacy.call(navigator, constraints, resolve, reject));
  }
  return Promise.reject(Object.assign(new Error('No camera API'), { name: 'NotSupportedError' }));
}

export function describeCameraError(err, lang = 'vi', secureContext = true) {
  const t = qrCopy(lang);
  if (!secureContext) return t.insecureContext;
  const name = err?.name || '';
  if (name === 'NotAllowedError' || name === 'PermissionDeniedError' || name === 'SecurityError') {
    return t.permissionDenied;
  }
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError' || name === 'OverconstrainedError') {
    return t.noCameraFound;
  }
  if (name === 'NotReadableError' || name === 'TrackStartError' || name === 'AbortError') {
    return t.cameraBusy;
  }
  return t.cameraError;
}

export function mountQRScanner({
  scannerBox,
  videoEl,
  statusEl,
  errorEl,
  retryBtn,
  cameraBtn,
  fileInput,
  lang = 'vi',
  topics = VISIT_TOPICS,
  matcher = null,
  invalidMessage = '',
  successMessage = null,
  onMatch,
}) {
  const t = qrCopy(lang);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  let stream = null;
  let timerId = null;
  let stopped = false;
  let paused = false;
  let scanning = false;
  let requesting = false;
  let detector = null;

  function setCameraActive(active) {
    if (scannerBox) scannerBox.dataset.camera = active ? 'active' : 'idle';
    if (cameraBtn) cameraBtn.hidden = active;
  }

  function setStatus(text, kind = 'info') {
    if (!statusEl) return;
    statusEl.textContent = text;
    statusEl.dataset.state = kind;
    statusEl.hidden = !text;
  }

  function showError(message) {
    paused = true;
    setStatus('', 'info');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.hidden = false;
    }
    if (retryBtn) retryBtn.hidden = false;
  }

  function clearError() {
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.hidden = true;
    }
    if (retryBtn) retryBtn.hidden = true;
  }

  function initBarcodeDetectorAsync() {
    if (detector || typeof window === 'undefined' || !('BarcodeDetector' in window)) return;
    Promise.resolve(window.BarcodeDetector.getSupportedFormats?.())
      .then((supported) => {
        if (!stopped && (!supported || supported.includes('qr_code'))) {
          detector = new window.BarcodeDetector({ formats: ['qr_code'] });
        }
      })
      .catch(() => { detector = null; });
  }

  function handleDecodedText(rawText) {
    if (stopped) return;
    const result = matcher ? matcher(rawText, topics) : matchTopicFromQR(rawText, topics);
    if (!result) {
      showError(invalidMessage || t.invalidQr);
      return;
    }
    clearError();
    paused = true;
    const msg = typeof successMessage === 'function'
      ? successMessage(result)
      : (result?.slug ? t.matched(visitTitle(result, lang)) : t.matched('Cố đô Hoa Lư'));
    setStatus(msg, 'success');
    stop();
    window.setTimeout(() => onMatch(result), 220);
  }

  async function scanFrame() {
    if (stopped || paused || scanning) return;
    if (!videoEl || videoEl.readyState < 2 || !videoEl.videoWidth || !videoEl.videoHeight) {
      scheduleNext();
      return;
    }
    scanning = true;
    try {
      const maxDim = 640;
      const scale = Math.min(1, maxDim / Math.max(videoEl.videoWidth, videoEl.videoHeight));
      const w = Math.max(1, Math.round(videoEl.videoWidth * scale));
      const h = Math.max(1, Math.round(videoEl.videoHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      ctx.drawImage(videoEl, 0, 0, w, h);
      const raw = await decodeCanvas(canvas, ctx, detector);
      if (raw && !stopped && !paused) {
        handleDecodedText(raw);
        return;
      }
    } catch {
      /* ignore transient frame read errors */
    } finally {
      scanning = false;
    }
    scheduleNext();
  }

  function scheduleNext() {
    if (stopped || paused) return;
    timerId = window.setTimeout(scanFrame, 140);
  }

  async function attachAndPlay(mediaStream) {
    stream = mediaStream;
    videoEl.muted = true;
    videoEl.autoplay = true;
    videoEl.playsInline = true;
    videoEl.setAttribute('muted', '');
    videoEl.setAttribute('autoplay', '');
    videoEl.setAttribute('playsinline', '');
    videoEl.srcObject = mediaStream;
    try {
      await videoEl.play();
    } catch {
      await new Promise((resolve) => {
        const onReady = () => {
          videoEl.play().catch(() => {}).finally(resolve);
        };
        if (videoEl.readyState >= 1) onReady();
        else videoEl.addEventListener('loadedmetadata', onReady, { once: true });
      });
    }
  }

  // IMPORTANT: No `await` before calling requestMediaStream so mobile browsers
  // preserve the user-gesture token and immediately show the Camera permission prompt.
  function startCamera() {
    if (stopped || requesting) return;
    if (stream) {
      setCameraActive(true);
      clearError();
      paused = false;
      setStatus(t.scanning, 'info');
      scheduleNext();
      return;
    }
    clearError();
    paused = false;
    setCameraActive(false);

    if (typeof window !== 'undefined' && window.isSecureContext === false) {
      setStatus(t.insecureContext, 'warn');
      return;
    }

    requesting = true;
    setStatus(t.startingCamera, 'info');

    const primaryReq = requestMediaStream({
      video: { facingMode: { ideal: 'environment' } },
      audio: false,
    });

    primaryReq
      .catch((err) => {
        const name = err?.name || '';
        if (name === 'NotAllowedError' || name === 'PermissionDeniedError' || name === 'SecurityError') {
          throw err;
        }
        // Fallback to any camera (front camera / desktop webcam)
        return requestMediaStream({ video: true, audio: false });
      })
      .then(async (mediaStream) => {
        if (stopped) {
          mediaStream.getTracks().forEach((track) => track.stop());
          return;
        }
        await attachAndPlay(mediaStream);
        if (stopped) return;
        setCameraActive(true);
        setStatus(t.scanning, 'info');
        initBarcodeDetectorAsync();
        loadJsQR().catch(() => {});
        scheduleNext();
      })
      .catch((err) => {
        if (stopped) return;
        setCameraActive(false);
        const secure = typeof window === 'undefined' ? true : window.isSecureContext !== false;
        setStatus(describeCameraError(err, lang, secure), 'warn');
      })
      .finally(() => {
        requesting = false;
      });
  }

  const onRetry = () => {
    clearError();
    paused = false;
    if (stream) {
      setStatus(t.scanning, 'info');
      scheduleNext();
    } else {
      startCamera();
    }
  };

  const onCameraClick = () => {
    startCamera();
  };

  const onFileChange = async () => {
    const file = fileInput?.files?.[0];
    if (!file) return;
    fileInput.value = '';
    clearError();
    setStatus(t.scanning, 'info');
    try {
      const raw = await decodeQRFromFile(file);
      if (!raw) {
        showError(t.noQrInImage);
        return;
      }
      handleDecodedText(raw);
    } catch {
      showError(t.noQrInImage);
    }
  };

  retryBtn?.addEventListener('click', onRetry);
  cameraBtn?.addEventListener('click', onCameraClick);
  fileInput?.addEventListener('change', onFileChange);

  function stop() {
    stopped = true;
    paused = true;
    if (timerId !== null) {
      window.clearTimeout(timerId);
      timerId = null;
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      stream = null;
    }
    if (videoEl) {
      videoEl.pause?.();
      videoEl.srcObject = null;
    }
    retryBtn?.removeEventListener('click', onRetry);
    cameraBtn?.removeEventListener('click', onCameraClick);
    fileInput?.removeEventListener('change', onFileChange);
  }

  // Trigger camera permission request immediately on the click stack that opened the modal
  startCamera();
  return { stop, resume: onRetry, startCamera };
}
