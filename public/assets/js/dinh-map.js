import { HOTSPOTS_DTH } from './hotspots.js';
import { getLangData } from './i18n.js';

const FILE_CODES = { vi: 'vi', en: 'en', fr: 'fr', ko: 'kr', zh: 'cn', ja: 'jp' };
const FILE_LANGS = { vi: 'vi', en: 'en', fr: 'fr', kr: 'ko', cn: 'zh', jp: 'ja' };

// Positions refer to the original 539 × 1077 map, including its header.
export const DINH_FLAG_POSITIONS = [
  [94.3, 45.5], [54.7, 48.3], [42.9, 43.8],
  [44.3, 34.8], [52.2, 29.1], [50.5, 25.0],
  [70.1, 30.2], [29.2, 30.8], [33.8, 30.4],
];

const ENGLISH_NAMES = [
  'Meridian Gate', 'Dragon Bed', 'Outer Gate', 'Inner Gate', 'Dragon Bed',
  'Temple of King Dinh Tien Hoang', 'Exhibition Room',
  'Worship Hall for King Dinh’s Parents', 'Stele House',
];
const CHINESE_NAMES = ['午门关', '外仪门前龙床', '外仪门', '内仪门', '龙庭龙床', '丁先皇庙', '展示馆', '启圣祠', '碑亭'];
const JAPANESE_NAMES = ['午門関', '外儀門前の龍床', '外儀門', '内儀門', '龍庭の龍床', '丁先皇廟', '展示館', '啓聖祠', '碑亭'];
const COPY = {
  vi: { title: 'SƠ ĐỒ THAM QUAN ĐỀN THỜ\nVUA ĐINH TIÊN HOÀNG', prompt: 'Chạm vào các mục dưới đây để xem thuyết minh chi tiết.', list: 'Các điểm tham quan đền vua Đinh' },
  en: { title: 'VISITOR MAP\nKING DINH TIEN HOANG TEMPLE', prompt: 'Select a place below to explore its story.', list: 'King Dinh Temple visitor attractions' },
  fr: { title: 'PLAN DE VISITE DU TEMPLE\nDU ROI DINH TIEN HOANG', prompt: 'Sélectionnez un lieu ci-dessous pour découvrir son histoire.', list: 'Lieux à visiter au temple du roi Dinh' },
  ko: { title: '딘띠엔호앙 왕 사당\n관람 안내도', prompt: '아래 장소를 선택하여 자세한 설명을 확인하세요.', list: '딘 왕 사당 관람 장소' },
  zh: { title: '丁先皇庙\n参观示意图', prompt: '选择下方景点，查看详细介绍。', list: '丁王庙参观点' },
  ja: { title: '丁先皇廟\n見学案内図', prompt: '下の項目を選ぶと詳しい解説をご覧いただけます。', list: '丁王廟の見どころ' },
};

export function dinhMapName(spot, index, lang) {
  if (lang === 'zh') return CHINESE_NAMES[index];
  if (lang === 'ja') return JAPANESE_NAMES[index];
  return getLangData(lang).hotspots?.[spot.id]?.name || spot.name;
}

function initialLanguage() {
  const match = location.pathname.match(/\/index_(vi|en|fr|kr|cn|jp)\.html$/);
  let saved;
  try { saved = localStorage.getItem('lang'); } catch (_) { /* storage unavailable */ }
  const lang = (match && FILE_LANGS[match[1]]) || new URLSearchParams(location.search).get('lang') || saved;
  return COPY[lang] ? lang : 'vi';
}

function initDinhMap() {
  const page = document.getElementById('pf1');
  const key = document.getElementById('dinh-map-key');
  if (!page || !key) return;

  const title = document.createElement('h1');
  title.className = 'dinh-map-title';
  page.appendChild(title);

  const prompt = document.createElement('p');
  prompt.className = 'dinh-map-prompt';
  const list = document.createElement('nav');
  list.className = 'dinh-map-list';
  key.append(prompt, list);

  const entries = HOTSPOTS_DTH.map((spot, index) => {
    function linkToSpot(link) {
      link.addEventListener('click', event => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (!window.TravisUtility?.goTo) return;
        event.preventDefault();
        window.TravisUtility.goTo(spot.route);
      });
    }

    const flag = document.createElement('a');
    flag.className = 'dinh-map-flag' + (index === 7 || index === 8 ? ' dinh-map-flag-close' : '');
    flag.style.left = DINH_FLAG_POSITIONS[index][0] + '%';
    flag.style.top = DINH_FLAG_POSITIONS[index][1] + '%';
    linkToSpot(flag);
    page.appendChild(flag);

    const link = document.createElement('a');
    link.className = 'dinh-map-list-item';
    linkToSpot(link);
    const number = document.createElement('span');
    number.className = 'dinh-map-number';
    number.textContent = spot.number;
    const label = document.createElement('span');
    label.className = 'dinh-map-label';
    const name = document.createElement('strong');
    const secondary = document.createElement('small');
    label.append(name, secondary);
    link.append(number, label);
    list.appendChild(link);
    return { spot, flag, link, name, secondary };
  });

  function setMapLanguage(lang) {
    if (!COPY[lang]) return;
    const copy = COPY[lang];
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : lang;
    title.textContent = copy.title;
    prompt.textContent = copy.prompt;
    list.setAttribute('aria-label', copy.list);
    page.querySelector('.bi')?.setAttribute('alt', copy.title.replace('\n', ' '));
    entries.forEach(({ spot, flag, link, name, secondary }, index) => {
      const label = dinhMapName(spot, index, lang);
      const href = '/' + spot.route + '/index_' + FILE_CODES[lang] + '.html';
      flag.href = link.href = href;
      flag.setAttribute('aria-label', spot.number + '. ' + label);
      name.textContent = label;
      secondary.textContent = lang === 'en' ? spot.name : ENGLISH_NAMES[index];
    });
  }

  setMapLanguage(initialLanguage());
  document.body.classList.add('dinh-map-ready');
  key.hidden = false;

  document.addEventListener('click', event => {
    const button = event.target.closest('.topbar .fl button');
    if (button?.dataset.l) setMapLanguage(button.dataset.l);
  });
  window.addEventListener('message', event => {
    if (event.origin === location.origin && event.source === window.parent && event.data?.type === 'parent-lang') {
      setMapLanguage(event.data.lang);
    }
  });
}

if (typeof document !== 'undefined') initDinhMap();
