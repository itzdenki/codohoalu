import { VISIT_TOPICS, visitTitle } from './visit-topics.js';

const QR_COPY = {
  vi: {
    homeModalTitle: 'Quét mã QR tham quan',
    tabScan: 'Quét mã QR',
    tabHomeQr: 'QR Trang chủ',
    scanHint: 'Đưa camera vào mã QR tại 14 điểm nội dung để mở nhanh bài thuyết minh.',
    startingCamera: 'Đang mở camera...',
    scanning: 'Đang quét mã QR...',
    chooseImage: 'Chọn ảnh mã QR từ máy',
    retry: 'Quét lại',
    cameraError: 'Không mở được camera (chưa cấp quyền hoặc thiết bị không có camera). Hãy dùng nút chọn ảnh mã QR bên dưới.',
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
    startingCamera: 'Opening camera...',
    scanning: 'Scanning for QR code...',
    chooseImage: 'Scan QR from image',
    retry: 'Scan again',
    cameraError: 'Camera unavailable or permission denied. You can choose a QR image from your device below.',
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
    startingCamera: 'Ouverture de la caméra...',
    scanning: 'Recherche d’un QR code...',
    chooseImage: 'Choisir une image QR',
    retry: 'Scanner à nouveau',
    cameraError: 'Caméra indisponible ou refusée. Vous pouvez sélectionner une image QR ci-dessous.',
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
    startingCamera: '카메라를 여는 중...',
    scanning: 'QR 코드를 스캔하는 중...',
    chooseImage: '기기에서 QR 이미지 선택',
    retry: '다시 스캔',
    cameraError: '카메라를 열 수 없습니다. 아래 버튼으로 QR 이미지를 선택해 주세요.',
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
    startingCamera: '正在开启摄像头...',
    scanning: '正在扫描二维码...',
    chooseImage: '从相册选择二维码图片',
    retry: '重新扫描',
    cameraError: '无法打开摄像头（未授权或无设备）。请使用下方按钮上传二维码图片。',
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
    startingCamera: 'カメラを起動中...',
    scanning: 'QRコードをスキャン中...',
    chooseImage: '端末からQR画像を選択',
    retry: '再スキャン',
    cameraError: 'カメラを起動できません。下のボタンからQR画像を選択してください。',
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

export function mountQRScanner({
  videoEl,
  statusEl,
  errorEl,
  retryBtn,
  fileInput,
  lang = 'vi',
  topics = VISIT_TOPICS,
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
  let detector = null;

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

  function handleDecodedText(rawText) {
    if (stopped) return;
    const topic = matchTopicFromQR(rawText, topics);
    if (!topic) {
      showError(t.invalidQr);
      return;
    }
    clearError();
    paused = true;
    setStatus(t.matched(visitTitle(topic, lang)), 'success');
    stop();
    window.setTimeout(() => onMatch(topic), 220);
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

  async function startCamera() {
    if (stopped) return;
    clearError();
    paused = false;
    setStatus(t.startingCamera, 'info');

    if (typeof window !== 'undefined' && 'BarcodeDetector' in window) {
      try {
        const supported = await window.BarcodeDetector.getSupportedFormats?.();
        if (!supported || supported.includes('qr_code')) {
          detector = new window.BarcodeDetector({ formats: ['qr_code'] });
        }
      } catch { detector = null; }
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus(t.cameraError, 'warn');
      return;
    }

    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      if (stopped) {
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
        return;
      }
      videoEl.srcObject = stream;
      videoEl.muted = true;
      videoEl.playsInline = true;
      videoEl.setAttribute('playsinline', '');
      await videoEl.play();
      setStatus(t.scanning, 'info');
      loadJsQR().catch(() => {});
      scheduleNext();
    } catch {
      if (!stopped) setStatus(t.cameraError, 'warn');
    }
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
    fileInput?.removeEventListener('change', onFileChange);
  }

  startCamera();
  return { stop, resume: onRetry };
}
