import { getLangData } from './i18n.js';
import { HOTSPOTS_DTH, HOTSPOTS_LDH } from './hotspots.js';
import { pages, pathFor, resolveRoute } from './routes.js';
import { VISIT_TOPICS, visitTitle } from './visit-topics.js';
import { mountQRScanner, qrCopy } from './qr-scanner.js';

const app = document.querySelector('#app');
const state = { mode: 'home', lang: 'vi', spot: null, visit: null, menu: false, cover: true, menuReturn: null, langPicker: false, langPickerDismissible: false };
let activeQrScanner = null;
const qrScanIcon = '<svg class="top-qr-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 12h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><rect x="8.5" y="7.5" width="2.4" height="2.4" rx="0.5" fill="currentColor"/><rect x="13.1" y="7.5" width="2.4" height="2.4" rx="0.5" fill="currentColor"/><rect x="8.5" y="14.1" width="2.4" height="2.4" rx="0.5" fill="currentColor"/><rect x="13.1" y="14.1" width="2.4" height="2.4" rx="0.5" fill="currentColor"/></svg>';
const menuItems = [
  ['so-do-den-dinh', 'Sơ đồ tham quan\nđền vua Đinh', '/images/menu/item-1-den-dinh.png', 'dth'],
  ['so-do-den-le', 'Sơ đồ tham quan\nđền vua Lê', '/images/menu/item-2-den-le.png', 'ldh'],
  ['tim-hieu-co-do', 'Tìm hiểu di tích\nCố đô Hoa Lư', '/images/menu/item-3-co-do.png', 'intro-co-do'],
  ['vua-dinh-tien-hoang', 'Thân thế, sự nghiệp\nvua Đinh Tiên Hoàng', '/images/menu/item-4-vua-dinh.png', 'bio-vua-dinh'],
  ['vua-le-dai-hanh', 'Thân thế, sự nghiệp\nvua Lê Đại Hành', '/images/menu/item-5-vua-le-dai-hanh.png', 'bio-vua-le-dai-hanh'],
  ['vua-le-long-dinh', 'Thân thế, sự nghiệp\nvua Lê Long Đĩnh', '/images/menu/item-6-vua-le-long-dinh.png', 'bio-vua-le-long-dinh'],
  ['duong-van-nga', 'Thái hậu\nDương Vân Nga', '/images/menu/item-7-duong-van-nga.png', 'bio-duong-van-nga'],
  ['kien-truc', 'Kiến trúc', '/images/menu/item-8-kien-truc.png', 'architecture'],
  ['goc-chup-dep-nhat', 'Góc chụp\nđẹp nhất', '/images/photo-spots/spot-1.jpg', 'photo-spots'],
];
const sections = ['home', ...menuItems.map((item) => item[3])];
const guideCopy = {
  vi: { topics: 'Nội dung thuyết minh', index: 'Mục lục', overview: 'Sơ đồ và chuyên đề', details: 'Chi tiết', home: 'Trang chủ', mapBack: 'Trở lại sơ đồ', previous: 'Mục trước', next: 'Mục tiếp theo', language: 'Ngôn ngữ' },
  en: { topics: 'Audio guide topics', index: 'Contents', overview: 'Maps and highlights', details: 'Details', home: 'Home', mapBack: 'Back to map', previous: 'Previous item', next: 'Next item', language: 'Language' },
  fr: { topics: 'Thèmes de visite', index: 'Sommaire', overview: 'Plans et thèmes', details: 'Détails', home: 'Accueil', mapBack: 'Retour au plan', previous: 'Sujet précédent', next: 'Sujet suivant', language: 'Langue' },
  ko: { topics: '음성 해설 주제', index: '목차', overview: '안내도 및 주요 주제', details: '상세 안내', home: '홈', mapBack: '안내도로 돌아가기', previous: '이전 항목', next: '다음 항목', language: '언어' },
  zh: { topics: '语音讲解主题', index: '目录', overview: '参观图与专题', details: '详细内容', home: '首页', mapBack: '返回参观图', previous: '上一项', next: '下一项', language: '语言' },
  ja: { topics: '音声ガイドの項目', index: '目次', overview: '案内図と特集', details: '詳細', home: 'ホーム', mapBack: '案内図に戻る', previous: '前の項目', next: '次の項目', language: '言語' },
};
const labels = { vi: 'Tiếng Việt', en: 'English', ko: '한국어', fr: 'Français', zh: '中文' };
const languageFiles = { vi: 'vi', en: 'en', ko: 'kr', fr: 'fr', zh: 'cn', ja: 'jp' };
const coverCopy = {
  vi: {
    dept: 'SỞ VĂN HÓA VÀ THỂ THAO NINH BÌNH',
    center: 'TRUNG TÂM BẢO TỒN DI TÍCH LỊCH SỬ - VĂN HÓA\nCỐ ĐÔ HOA LƯ',
    title1: 'ỨNG DỤNG TRẢI NGHIỆM',
    title2: 'THUYẾT MINH CỐ ĐÔ HOA LƯ',
    subtitle: '(Audio tour guide app)',
  },
  en: {
    dept: 'NINH BINH DEPARTMENT OF CULTURE AND SPORTS',
    center: 'HOA LU ANCIENT CAPITAL HISTORICAL & CULTURAL\nRELIC CONSERVATION CENTER',
    title1: 'HOA LU ANCIENT CAPITAL',
    title2: 'AUDIO TOUR GUIDE',
    subtitle: '(Interactive audio guide app)',
  },
  ko: {
    dept: '닌빈성 문화체육청',
    center: '호아루 고도 역사·문화 유적\n보존 센터',
    title1: '호아루 고도',
    title2: '오디오 가이드 체험 앱',
    subtitle: '(Audio tour guide app)',
  },
  fr: {
    dept: 'DÉPARTEMENT DE LA CULTURE ET DES SPORTS DE NINH BÌNH',
    center: 'CENTRE DE CONSERVATION DES VESTIGES HISTORIQUES\nDE L’ANCIENNE CAPITALE HOA LƯ',
    title1: 'GUIDE AUDIO INTERACTIF',
    title2: 'ANCIENNE CAPITALE HOA LƯ',
    subtitle: '(Application de visite guidée)',
  },
  zh: {
    dept: '宁平省文化与体育厅',
    center: '华闾古都历史文化遗迹\n保护中心',
    title1: '华闾古都',
    title2: '语音导览体验应用',
    subtitle: '(Audio tour guide app)',
  },
  ja: {
    dept: 'ニンビン省文化スポーツ局',
    center: 'ホアルー古都歴史文化遺跡\n保存センター',
    title1: 'ホアルー古都',
    title2: '音声ガイド体験アプリ',
    subtitle: '(Audio tour guide app)',
  },
};
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const toc = () => getLangData(state.lang).toc;
const guide = () => guideCopy[state.lang] || guideCopy.vi;
const itemTitle = (item) => toc().items?.[item[0]] || item[1];

function navHTML() {
  return `<aside class="desktop-nav" aria-label="${esc(toc().title)}"><button class="desktop-brand" data-action="home"><span class="desktop-brand-mark">HL</span><span><strong>CỐ ĐÔ HOA LƯ</strong><small>AUDIO GUIDE</small></span></button><div class="desktop-nav-heading">${esc(toc().title)}</div><nav class="desktop-nav-list">${menuItems.map((item, index) => `<button data-mode="${item[3]}" class="${state.mode === item[3] ? 'is-active' : ''}" ${state.mode === item[3] ? 'aria-current="page"' : ''}><span class="desktop-nav-number">${String(index + 1).padStart(2, '0')}</span><span>${esc(itemTitle(item).replace('\n', ' '))}</span></button>`).join('')}</nav><p class="desktop-nav-footer">NINH BÌNH · VIỆT NAM</p></aside>`;
}
function languageButtonsHTML() {
  const buttons = Object.entries(labels).map(([code, label]) => {
    const extension = code === 'zh' || code === 'ja' ? 'svg' : 'png';
    const active = state.lang === code;
    return `<button type="button" class="top-control-btn top-flag-btn${active ? ' is-active' : ''}" data-lang="${code}" aria-label="${esc(label)}" title="${esc(label)}" aria-pressed="${active}"><img src="/images/flags/${code}.${extension}" alt=""></button>`;
  });
  return `<div class="guide-languages" role="group" aria-label="${esc(guide().language)}">${buttons.join('')}</div>`;
}
function topHTML(spotMode = false) {
  const label = esc(spotMode ? guide().mapBack : guide().home);
  const scanLabel = esc(qrCopy(state.lang).tabScan);
  const icon = spotMode
    ? '<span class="guide-back-icon" aria-hidden="true">‹</span>'
    : '<svg class="top-home-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2.5 1.5 11h2.7v9.5h5.4v-6.2h4.8v6.2h5.4V11h2.7L12 2.5Z"/></svg>';
  return `<div class="top-control-bar"><div class="guide-bar-inner">
    <button type="button" class="top-control-btn top-home-btn" data-action="${spotMode ? 'close-spot' : 'home'}" aria-label="${label}" title="${label}">${icon}<span class="guide-home-label">${label}</span></button>
    ${languageButtonsHTML()}
    <button type="button" class="top-control-btn top-qr-btn" data-action="qr" aria-haspopup="dialog" aria-label="${scanLabel}" title="${scanLabel}">${qrScanIcon}<span class="guide-qr-label">${scanLabel}</span></button>
  </div></div>`;
}
function guideBottomHTML({ menuAction, previousAction, nextAction, page = '', first = false, last = false }) {
  const { index, previous, next } = guide();
  return `<nav class="home-bottom-bar guide-bottom-bar" aria-label="${esc(toc().title)}">
    <div class="guide-bar-inner">
      <button type="button" class="guide-index-button" data-action="${menuAction}"><span aria-hidden="true">☰</span>${esc(index)}</button>
      <div class="guide-pagination">
        <button type="button" class="guide-step-button" data-action="${previousAction}" aria-label="${esc(previous)}" title="${esc(previous)}"${first ? ' disabled' : ''}>‹</button>
        ${page ? `<span class="guide-page-count">${page}</span>` : ''}
        <button type="button" class="guide-step-button" data-action="${nextAction}" aria-label="${esc(next)}" title="${esc(next)}"${last ? ' disabled' : ''}>›</button>
      </div>
    </div>
  </nav>`;
}
function bottomHTML(spotMode = false) {
  return guideBottomHTML({
    menuAction: 'menu',
    previousAction: spotMode ? 'spot-prev' : 'prev',
    nextAction: spotMode ? 'spot-next' : 'next',
  });
}
function langPickerHTML() {
  const rows = Object.entries(labels).map(([code, label]) => {
    const extension = code === 'zh' ? 'svg' : 'png';
    const active = state.lang === code && state.langPickerDismissible;
    return `<button type="button" class="lang-choice-btn${active ? ' is-active' : ''}" data-pick-lang="${code}" lang="${code}">
      <span class="lang-choice-flag"><img src="/images/flags/${code}.${extension}" alt=""></span>
      <span class="lang-choice-name">${esc(label)}</span>
      <span class="lang-choice-arrow" aria-hidden="true">${active ? '✓' : '›'}</span>
    </button>`;
  }).join('');
  return `<div class="lang-picker-backdrop" role="dialog" aria-modal="true" aria-labelledby="lang-picker-title">
    <div class="lang-picker-card">
      ${state.langPickerDismissible ? `<button type="button" class="lang-picker-close" data-action="close-lang-picker" aria-label="${esc(toc().close)}">✕</button>` : ''}
      <div class="lang-picker-header">
        <p class="lang-picker-eyebrow">CỐ ĐÔ HOA LƯ · AUDIO GUIDE</p>
        <h2 id="lang-picker-title" class="lang-picker-title">Chọn ngôn ngữ</h2>
        <p class="lang-picker-subtitle">Choose your language</p>
      </div>
      <div class="lang-picker-list">${rows}</div>
    </div>
  </div>`;
}
function coverHTML() {
  const menuLabel = esc(guide().index);
  const flagExt = state.lang === 'zh' ? 'svg' : 'png';
  const currentLangLabel = esc(labels[state.lang] || labels.vi);
  const cover = coverCopy[state.lang] || coverCopy.vi;
  return `<section class="landing-cover" aria-labelledby="landing-cover-title">
    <div class="landing-cover-frame">
      <div class="landing-cover-photo" aria-hidden="true">
        <div class="landing-cover-landscape">
          <img src="/images/home/cover-art.jpg" alt="" width="390" height="696" fetchpriority="high">
        </div>
        <div class="landing-cover-sky">
          <img src="/images/stories/le-3-thien-phuc-dao-kenh.jpg" alt="" width="768" height="1376">
        </div>
      </div>
      <header class="landing-cover-header" lang="${state.lang}" data-lang="${state.lang}">
        <img class="landing-cover-header-bg" src="/images/home/header-bg.svg" alt="" width="1024" height="330" aria-hidden="true">
        <div class="landing-cover-header-inner">
          <img class="landing-cover-logo" src="/images/home/ninh-binh-logo.png" alt="Ninh Bình" width="128" height="128">
          <div class="landing-cover-org">
            <p class="landing-cover-dept">${esc(cover.dept)}</p>
            <p class="landing-cover-center">${esc(cover.center).replace('\n', '<br>')}</p>
          </div>
        </div>
      </header>
      <div class="landing-cover-title-wrap" lang="${state.lang}" data-lang="${state.lang}">
        <h1 id="landing-cover-title" class="landing-cover-title">
          <span class="cover-title-line" data-text="${esc(cover.title1)}">${esc(cover.title1)}</span>
          <span class="cover-title-line" data-text="${esc(cover.title2)}">${esc(cover.title2)}</span>
        </h1>
        <p class="landing-cover-subtitle">${esc(cover.subtitle)}</p>
      </div>
      <footer class="landing-cover-actions">
        <button type="button" class="landing-cover-menu" data-action="enter-visit" aria-label="${menuLabel}" title="${menuLabel}">
          <span class="landing-cover-menu-icon" aria-hidden="true"></span>
        </button>
        <button type="button" class="landing-cover-lang" data-action="open-lang-picker" aria-haspopup="dialog" aria-label="${esc(guide().language)}: ${currentLangLabel}" title="${esc(guide().language)}">
          <img src="/images/flags/${state.lang}.${flagExt}" alt="">
          <span>${currentLangLabel}</span>
          <span class="landing-cover-lang-caret" aria-hidden="true">▾</span>
        </button>
        <button type="button" class="landing-cover-qr" data-action="qr" aria-haspopup="dialog" aria-label="${esc(toc().qrTitle)}">
          <img src="/qr-access.png" width="480" height="480" alt="">
        </button>
      </footer>
      ${state.langPicker ? langPickerHTML() : ''}
    </div>
  </section>`;
}
function homeHTML() {
  const { topics, details } = guide();
  const close = esc(toc().close);
  const cards = VISIT_TOPICS.map(topic => `<button type="button" class="visit-topic" data-visit="${topic.id}">
    <span class="visit-topic-image"><img src="${esc(topic.image)}" alt="" loading="lazy" decoding="async"></span>
    <span class="visit-topic-title">${esc(visitTitle(topic, state.lang))}</span>
  </button>`).join('');
  return `<section class="visit-home" aria-labelledby="visit-index-title">
    <header class="visit-home-header"><div class="guide-bar-inner">
      ${languageButtonsHTML()}
      <button type="button" class="visit-menu-close" data-action="close-visit-menu" aria-label="${close}" title="${close}">×</button>
    </div></header>
    <div class="visit-home-wrap">
      <div class="visit-menu-banner" data-lang="${state.lang}"><h1 id="visit-index-title">${esc(toc().title)}</h1></div>
      <nav id="visit-topics" class="visit-topic-list" aria-label="${esc(topics)}">${cards}</nav>
      <button type="button" class="visit-overview-button" data-action="menu" aria-haspopup="dialog">
        <span class="visit-overview-images"><img src="${menuItems[0][2]}" alt="" decoding="async"><img src="${menuItems[1][2]}" alt="" decoding="async"></span>
        <span>${esc(details)}</span>
        <span class="visit-overview-arrow" aria-hidden="true">›</span>
      </button>
      <footer class="visit-menu-footer" data-lang="${state.lang}">
        <button type="button" class="visit-menu-footer-close" data-action="close-visit-menu" aria-label="${close}">
          ${state.lang === 'vi' ? '<img src="/images/menu/footer-lotus.png" width="352" height="75" alt="">' : close}
        </button>
      </footer>
    </div>
  </section>`;
}
function visitBottomHTML() {
  const index = VISIT_TOPICS.findIndex(topic => topic.id === state.visit?.id);
  return guideBottomHTML({
    menuAction: 'visit-home',
    previousAction: 'visit-prev',
    nextAction: 'visit-next',
    page: `${index + 1} / ${VISIT_TOPICS.length}`,
    first: index <= 0,
    last: index === VISIT_TOPICS.length - 1,
  });
}
function iframeHTML(route, title, { noAudio = false, spotMode = false, guideMode = false } = {}) {
  const query = new URLSearchParams({ lang: state.lang, notopbar: '1' });
  if (noAudio) query.set('noaudio', '1');
  if (guideMode) {
    query.set('view', 'guide');
    query.set('v', '12');
  }
  return `<div class="spot-content-loading" role="status">Đang tải nội dung…</div><iframe class="${spotMode ? 'spot-content-frame' : 'sodo-iframe'}" title="${esc(title)}" src="/${esc(route)}/index_${languageFiles[state.lang]}.html?${query}"${guideMode ? ' allow="autoplay"' : ''} style="visibility:hidden"></iframe>`;
}
function photoHTML() {
  const title = state.lang === 'ja' ? 'おすすめ撮影スポット' : state.lang === 'zh' ? '最佳拍照地点' : state.lang === 'en' ? 'BEST PHOTO SPOTS' : 'GÓC CHỤP ĐẸP NHẤT';
  return `<section class="photo-spots-screen" aria-label="${title}"><div class="photo-spots-body"><h1 class="photo-spots-title">${title}</h1><div class="photo-spots-grid">${['Cổng Ngọ Môn Quan','Bức tường hoa văn cổ','Con đường cổ thụ'].map((alt,i) => `<div class="photo-spots-frame${i===2 ? ' photo-spots-frame-wide' : ''}"><img src="/images/photo-spots/spot-${i+1}.jpg" alt="${alt}"></div>`).join('')}</div><div class="photo-spots-socials"><a class="photo-spots-social" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style="background:#1877f2">f</a><a class="photo-spots-social" href="https://zalo.me/" target="_blank" rel="noopener noreferrer" aria-label="Zalo" style="background:#0068ff">Zalo</a><a class="photo-spots-social" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style="background:linear-gradient(45deg,#f9a03f,#e1306c 55%,#833ab4)">◎</a></div></div><img src="/images/menu/footer-lotus.png" alt="" class="photo-spots-lotus">${bottomHTML()}</section>`;
}
function setupFrames(container) {
  container.querySelectorAll('iframe').forEach(frame => frame.addEventListener('load', () => {
    frame.contentWindow?.postMessage({ type:'parent-lang', lang:state.lang }, location.origin);
    frame.style.visibility = 'visible';
    frame.parentElement.querySelector('.spot-content-loading')?.remove();
  }, { once:true }));
}
function renderApp() {
  app.innerHTML = `<div class="experience-layout ${state.mode === 'home' || state.mode === 'visit' ? 'visit-layout' : ''}">${state.mode === 'home' || state.mode === 'visit' ? '' : navHTML()}<div class="experience-stage"></div></div>`;
  renderStage();
}
function renderStage() {
  const stage = app.querySelector('.experience-stage');
  if (!stage) return;
  let content = '';
  if (state.mode === 'home') content = state.cover ? coverHTML() : homeHTML();
  else if (state.mode === 'dth') content = `<section class="sodo-iframe-stage">${iframeHTML('pages/dth/so-do','Sơ đồ Đền Vua Đinh')}${bottomHTML()}</section>`;
  else if (state.mode === 'ldh') content = `<section class="sodo-iframe-stage">${iframeHTML('pages/ldh/so-do','Sơ đồ Đền Vua Lê')}${bottomHTML()}</section>`;
  else if (state.mode === 'photo-spots') content = photoHTML();
  else if (state.mode === 'visit' && state.visit) content = `<section class="sodo-iframe-stage visit-content-stage">${iframeHTML(state.visit.route,visitTitle(state.visit,state.lang),{ guideMode: true })}${visitBottomHTML()}</section>`;
  else if (pages[state.mode]) content = `<section class="sodo-iframe-stage">${iframeHTML(pages[state.mode][0],pages[state.mode][1],{ noAudio: state.mode === 'architecture' })}${bottomHTML()}</section>`;
  stage.innerHTML = `${state.mode !== 'home' ? topHTML() : ''}${content}`;
  setupFrames(stage);
  if (state.spot) renderSpot();
  if (state.menu) openMenu();
}
function renderSpot() {
  const stage = app.querySelector('.experience-stage');
  stage.querySelector('.spot-content-overlay')?.remove();
  if (!state.spot) return;
  const overlay = document.createElement('div');
  overlay.className = 'spot-content-overlay';
  overlay.setAttribute('role','dialog'); overlay.setAttribute('aria-modal','true');
  overlay.innerHTML = `${topHTML(true)}${iframeHTML(state.spot.route,state.spot.name,{ spotMode: true })}${bottomHTML(true)}`;
  stage.appendChild(overlay); setupFrames(overlay);
}
function openMenu() {
  state.menu = true;
  const stage = app.querySelector('.experience-stage');
  stage.querySelector('.toc-modal-backdrop')?.remove();
  const overlay = document.createElement('div');
  overlay.className = 'toc-modal-backdrop';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'toc-title');
  const overviewItems = menuItems.filter(item => item[0] !== 'goc-chup-dep-nhat');
  const close = esc(toc().close);
  const cards = overviewItems.map(item => `<button type="button" class="toc-card" data-mode="${item[3]}">
    <span class="toc-card-thumb-wrap"><img src="${item[2]}" alt="" class="toc-card-thumb" loading="lazy" decoding="async"></span>
    <span class="toc-card-label">${esc(itemTitle(item))}</span>
  </button>`).join('');
  overlay.innerHTML = `<div class="toc-parchment-sheet"><div class="toc-scroll-container">
    <header class="toc-header-banner" data-lang="${state.lang}">
      <button type="button" class="toc-top-close-btn" data-action="close-menu" aria-label="${close}" title="${close}">×</button>
      <h2 id="toc-title" class="toc-title">${esc(guide().overview)}</h2>
    </header>
    <div class="toc-grid">${cards}</div>
    <footer class="toc-footer-lotus"><button type="button" class="toc-close-pill-btn" data-action="close-menu">${close}</button></footer>
  </div></div>`;
  stage.appendChild(overlay);
}
function closeQRModal() {
  if (activeQrScanner) {
    activeQrScanner.stop();
    activeQrScanner = null;
  }
  app.querySelector('.qr-modal-backdrop')?.remove();
}

function showQR() {
  closeQRModal();
  const stage = app.querySelector('.experience-stage');
  if (!stage) return;
  const t = qrCopy(state.lang);
  const homeUrl = `${location.origin}/`;
  const overlay = document.createElement('div');
  overlay.className = 'pdf-modal-backdrop qr-modal-backdrop';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'cover-qr-title');
  overlay.innerHTML = `<div class="pdf-modal-card qr-modal-card">
    <div class="pdf-modal-header">
      <h3 id="cover-qr-title">${esc(t.homeModalTitle)}</h3>
      <button type="button" class="pdf-close-btn" data-action="close-qr" aria-label="${esc(toc().close)}">✕</button>
    </div>
    <div class="qr-modal-tabs" role="tablist">
      <button type="button" class="qr-tab-btn is-active" role="tab" aria-selected="true" data-qr-tab="scan">${esc(t.tabScan)}</button>
      <button type="button" class="qr-tab-btn" role="tab" aria-selected="false" data-qr-tab="home">${esc(t.tabHomeQr)}</button>
    </div>
    <div class="qr-modal-body" data-qr-panel="scan">
      <div class="qr-scanner-box" data-camera="idle">
        <video class="qr-scanner-video" autoplay muted playsinline></video>
        <div class="qr-scanner-reticle" aria-hidden="true"><span></span></div>
        <button type="button" class="qr-camera-btn">${esc(t.enableCamera)}</button>
      </div>
      <p class="qr-scanner-status" role="status" aria-live="polite">${esc(t.startingCamera)}</p>
      <div class="qr-scanner-error" role="alert" hidden></div>
      <div class="qr-scanner-actions">
        <button type="button" class="qr-retry-btn" hidden>${esc(t.retry)}</button>
        <label class="qr-upload-btn">${esc(t.chooseImage)}<input type="file" accept="image/*" class="qr-file-input" hidden></label>
      </div>
      <p class="qr-scanner-hint">${esc(t.scanHint)}</p>
    </div>
    <div class="qr-modal-body" data-qr-panel="home" hidden>
      <div class="qr-code-frame">
        <img src="/images/qr/00-home.png" alt="${esc(t.tabHomeQr)}" width="220" height="220" class="qr-image">
      </div>
      <p class="qr-url-badge">${esc(homeUrl)}</p>
      <p>${esc(t.homeQrDesc)}</p>
      <a class="qr-download-btn" href="/images/qr/00-home.png" download="00-home-codohoalu-qr.png">${esc(t.downloadQr)}</a>
    </div>
  </div>`;

  const startScanner = () => {
    if (activeQrScanner) { activeQrScanner.stop(); activeQrScanner = null; }
    activeQrScanner = mountQRScanner({
      scannerBox: overlay.querySelector('.qr-scanner-box'),
      videoEl: overlay.querySelector('.qr-scanner-video'),
      statusEl: overlay.querySelector('.qr-scanner-status'),
      errorEl: overlay.querySelector('.qr-scanner-error'),
      retryBtn: overlay.querySelector('.qr-retry-btn'),
      cameraBtn: overlay.querySelector('.qr-camera-btn'),
      fileInput: overlay.querySelector('.qr-file-input'),
      lang: state.lang,
      topics: VISIT_TOPICS,
      onMatch: (topic) => {
        closeQRModal();
        navigateVisit(topic.id);
      },
    });
  };

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) { closeQRModal(); return; }
    const tabBtn = event.target.closest('[data-qr-tab]');
    if (!tabBtn) return;
    const mode = tabBtn.dataset.qrTab;
    overlay.querySelectorAll('[data-qr-tab]').forEach((btn) => {
      const active = btn.dataset.qrTab === mode;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', String(active));
    });
    overlay.querySelectorAll('[data-qr-panel]').forEach((panel) => {
      panel.hidden = panel.dataset.qrPanel !== mode;
    });
    if (mode === 'scan') {
      startScanner();
    } else if (activeQrScanner) {
      activeQrScanner.stop();
      activeQrScanner = null;
    }
  });

  stage.appendChild(overlay);
  startScanner();
}

function showTopicQR(topic) {
  if (!topic) return;
  closeQRModal();
  const stage = app.querySelector('.experience-stage');
  if (!stage) return;
  const t = qrCopy(state.lang);
  const num = String(topic.number).padStart(2, '0');
  const title = `${num} · ${visitTitle(topic, state.lang)}`;
  const topicUrl = `${location.origin}/${topic.route}`;
  const overlay = document.createElement('div');
  overlay.className = 'pdf-modal-backdrop qr-modal-backdrop';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'topic-qr-title');
  overlay.innerHTML = `<div class="pdf-modal-card qr-modal-card">
    <div class="pdf-modal-header">
      <h3 id="topic-qr-title">${esc(t.topicQrTitle)}</h3>
      <button type="button" class="pdf-close-btn" data-action="close-qr" aria-label="${esc(toc().close)}">✕</button>
    </div>
    <div class="qr-modal-body">
      <p class="qr-topic-heading">${esc(title)}</p>
      <div class="qr-code-frame">
        <img src="${esc(topic.qrImage)}" alt="${esc(title)}" width="220" height="220" class="qr-image">
      </div>
      <p class="qr-url-badge">${esc(topicUrl)}</p>
      <p>${esc(t.topicQrDesc)}</p>
      <a class="qr-download-btn" href="${esc(topic.qrImage)}" download="${num}-${esc(topic.slug)}-qr.png">${esc(t.downloadQr)}</a>
    </div>
  </div>`;
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeQRModal();
  });
  stage.appendChild(overlay);
}
function updateURL() {
  const path = pathFor(state.mode, state.spot, state.visit);
  if (location.pathname !== path) history.pushState(null, '', path + location.search);
}
function navigate(mode) { if (!sections.includes(mode)) return; closeQRModal(); state.mode=mode; state.menu=false; state.spot=null; state.visit=null; state.menuReturn=null; if (mode === 'home') state.cover=true; updateURL(); renderApp(); }
function showVisitHome() {
  closeQRModal();
  if (state.mode === 'visit' && state.visit) state.menuReturn = state.visit.id;
  else if (state.mode === 'home' && state.cover) state.menuReturn = null;
  state.mode='home'; state.cover=false; state.menu=false; state.spot=null; state.visit=null;
  updateURL(); renderApp();
}
function closeVisitHome() {
  const returnId = state.menuReturn;
  state.menuReturn = null;
  if (returnId) navigateVisit(returnId);
  else navigate('home');
}
function navigateVisit(id) {
  const topic = VISIT_TOPICS.find(item => item.id === id);
  if (!topic) return;
  closeQRModal();
  state.mode='visit'; state.visit=topic; state.spot=null; state.menu=false; state.menuReturn=null;
  updateURL(); renderApp();
}
function openSpot(spot) {
  if (!spot) return;
  const sameMap = state.mode === spot.temple && app.querySelector('.experience-stage');
  state.mode=spot.temple; state.spot=spot; state.visit=null; state.menu=false;
  updateURL();
  app.querySelector('.toc-modal-backdrop')?.remove();
  if (sameMap) renderSpot(); else renderApp();
}
function changeLanguage(lang) {
  if (!labels[lang]) return;
  state.lang = lang;
  state.langPicker = false;
  state.langPickerDismissible = false;
  try { localStorage.setItem('lang', lang); } catch { /* storage unavailable */ }
  renderApp();
}
app.addEventListener('click', event => {
  if (event.target.classList?.contains('lang-picker-backdrop') && state.langPickerDismissible) {
    state.langPicker = false;
    state.langPickerDismissible = false;
    renderApp();
    return;
  }
  const button = event.target.closest('button');
  if (!button || !app.contains(button)) return;
  if (button.dataset.pickLang) { changeLanguage(button.dataset.pickLang); return; }
  if (button.dataset.visit) { navigateVisit(button.dataset.visit); return; }
  if (button.dataset.mode) { navigate(button.dataset.mode); return; }
  if (button.dataset.lang) { changeLanguage(button.dataset.lang); return; }
  switch(button.dataset.action) {
    case 'home': navigate('home'); break;
    case 'visit-home': case 'enter-visit': showVisitHome(); break;
    case 'close-visit-menu': closeVisitHome(); break;
    case 'open-lang-picker': state.langPicker = true; state.langPickerDismissible = true; renderApp(); break;
    case 'close-lang-picker': state.langPicker = false; state.langPickerDismissible = false; renderApp(); break;
    case 'visit-prev': case 'visit-next': {
      const index = VISIT_TOPICS.findIndex(topic => topic.id === state.visit?.id);
      const topic = VISIT_TOPICS[index + (button.dataset.action === 'visit-prev' ? -1 : 1)];
      if (topic) navigateVisit(topic.id);
      break;
    }
    case 'menu': openMenu(); break;
    case 'close-menu': state.menu=false; app.querySelector('.toc-modal-backdrop')?.remove(); break;
    case 'qr': showQR(); break;
    case 'topic-qr': showTopicQR(state.visit); break;
    case 'close-qr': closeQRModal(); break;
    case 'close-spot': state.spot=null; updateURL(); app.querySelector('.spot-content-overlay')?.remove(); break;
    case 'prev': navigate(sections[(sections.indexOf(state.mode)-1+sections.length)%sections.length]); break;
    case 'next': navigate(sections[(sections.indexOf(state.mode)+1)%sections.length]); break;
    case 'spot-prev': case 'spot-next': {
      const list = state.spot?.temple === 'ldh' ? HOTSPOTS_LDH : HOTSPOTS_DTH;
      const index = list.findIndex(item => item.id === state.spot?.id);
      const next = index + (button.dataset.action === 'spot-prev' ? -1 : 1);
      if (next >= 0 && next < list.length) openSpot(list[next]);
      else { state.spot=null; updateURL(); app.querySelector('.spot-content-overlay')?.remove(); }
      break;
    }
  }
});
window.addEventListener('message', event => {
  if (event.origin !== location.origin || !Array.from(app.querySelectorAll('iframe')).some(frame => frame.contentWindow === event.source)) return;
  const data = event.data;
  if (data?.type === 'spot-goto' && typeof data.route === 'string') {
    const spot = [...HOTSPOTS_DTH,...HOTSPOTS_LDH].find(item => item.route === data.route.replace(/^\/+|\/+$/g,''));
    if (spot) openSpot(spot);
  } else if (data?.type === 'spot-close' && state.mode === 'visit') { navigate('home'); }
  else if (data?.type === 'spot-close' && state.spot) { state.spot=null; updateURL(); app.querySelector('.spot-content-overlay')?.remove(); }
  else if (data?.type === 'spot-lang') changeLanguage(data.lang);
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && app.querySelector('.qr-modal-backdrop')) closeQRModal();
  else if (event.key === 'Escape' && state.langPicker && state.langPickerDismissible) {
    state.langPicker = false;
    state.langPickerDismissible = false;
    renderApp();
  }
});
window.addEventListener('popstate', () => {
  closeQRModal();
  Object.assign(state, { visit: null }, resolveRoute(location.pathname), { menu: false });
  renderApp();
});
Object.assign(state, resolveRoute(location.pathname));
const params = new URLSearchParams(location.search);
let hasSavedLang = false;
try {
  const savedLang = localStorage.getItem('lang');
  if (labels[savedLang]) {
    state.lang = savedLang;
    hasSavedLang = true;
  }
} catch { /* storage unavailable */ }
const queryLang = params.get('lang');
if (labels[queryLang]) {
  state.lang = queryLang;
  hasSavedLang = true;
  try { localStorage.setItem('lang', queryLang); } catch { /* storage unavailable */ }
}
if (state.mode === 'home' && state.cover && !hasSavedLang) {
  state.langPicker = true;
  state.langPickerDismissible = false;
}
if (params.has('qr')) {
  params.delete('qr');
  history.replaceState(null,'',location.pathname + (params.toString() ? '?' + params : '') + location.hash);
}
renderApp();
