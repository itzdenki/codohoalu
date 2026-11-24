import { HOTSPOTS_DTH, HOTSPOTS_LDH } from './hotspots.js';
import { VISIT_TOPICS } from './visit-topics.js';

export const pages = {
  'intro-co-do': ['pages/dth/gioi-thieu', 'Tìm hiểu di tích Cố đô Hoa Lư'],
  'bio-vua-dinh': ['pages/dth/than-the-va-su-nghiep', 'Vua Đinh Tiên Hoàng'],
  'bio-vua-le-dai-hanh': ['pages/ldh/than-the-su-nghiep-vua-le-dai-hanh', 'Vua Lê Đại Hành'],
  'bio-vua-le-long-dinh': ['pages/ldh/than-the-su-nghiep-vua-le-long-dinh', 'Vua Lê Long Đĩnh'],
  'bio-duong-van-nga': ['pages/ldh/thai-hau-duong-van-nga', 'Thái hậu Dương Vân Nga'],
  architecture: ['pages/dth/kien-truc', 'Kiến trúc'],
};

const sectionPaths = {
  home: '/',
  dth: '/pages/dth/so-do',
  ldh: '/pages/ldh/so-do',
  'photo-spots': '/pages/photo-spots',
  ...Object.fromEntries(Object.entries(pages).map(([mode, page]) => [mode, `/${page[0]}`])),
};

export function pathFor(mode, spot = null, visit = null) {
  if (mode === 'visit') {
    const topic = VISIT_TOPICS.find(item => item.route === visit?.route);
    return topic ? `/${topic.route}` : '/';
  }
  return spot ? `/${spot.route}` : (sectionPaths[mode] || '/');
}

export function resolveRoute(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  const entry = Object.entries(sectionPaths).find(([, value]) => value === path);
  if (entry) return { mode: entry[0], spot: null };
  const route = path.replace(/^\//, '');
  const visit = VISIT_TOPICS.find(item => item.route === route);
  if (visit) return { mode: 'visit', spot: null, visit };
  const spot = [...HOTSPOTS_DTH, ...HOTSPOTS_LDH].find(item => item.route === route);
  if (spot) return { mode: spot.temple, spot };
  const match = /^pages\/(dth|ldh)\/([a-z0-9-]+)$/.exec(route);
  if (match) return { mode: match[1], spot: { id: route, route, temple: match[1], name: match[2].replace(/-/g, ' ') } };
  return { mode: 'home', spot: null };
}
