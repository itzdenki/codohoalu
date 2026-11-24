export const STORY_UI_LABELS = {
  vi: {
    pdfBtnTitle: 'Xem nội dung trang PDF lật',
    interactiveBtn: '← 🎬 Hình ảnh tương tác',
    playHint: 'Chạm để nghe thuyết minh',
    pauseHint: 'Chạm để tạm dừng giọng đọc',
    watchVideo: '▶ Xem Video Cố đô',
    closeDetail: 'Đóng',
  },
  en: {
    pdfBtnTitle: 'Switch to PDF Flipbook View',
    interactiveBtn: '← 🎬 Interactive Story',
    playHint: 'Tap to play voice narration',
    pauseHint: 'Tap to pause narration',
    watchVideo: '▶ Hoa Lu Video',
    closeDetail: 'Close',
  },
  ko: {
    pdfBtnTitle: 'PDF 페이지 보기로 전환',
    interactiveBtn: '← 🎬 인터랙티브 화면',
    playHint: '터치하여 음성 해설 듣기',
    pauseHint: '터치하여 일시정지',
    watchVideo: '▶ 호아르 영상',
    closeDetail: '닫기',
  },
  fr: {
    pdfBtnTitle: 'Voir les pages PDF',
    interactiveBtn: '← 🎬 Image interactive',
    playHint: 'Touchez pour écouter',
    pauseHint: 'Touchez pour mettre en pause',
    watchVideo: '▶ Vidéo Hoa Lu',
    closeDetail: 'Fermer',
  },
};

export function getStoryUiLabels(lang = 'vi') {
  return STORY_UI_LABELS[lang] || STORY_UI_LABELS.vi;
}

export const STORY_HEADERS = {
  'intro-co-do': {
    vi: ['DI TÍCH LỊCH SỬ - VĂN HÓA', 'CỐ ĐÔ HOA LƯ'],
    en: ['HISTORICAL & CULTURAL RELIC', 'HOA LU ANCIENT CAPITAL'],
    ko: ['역사 · 문화 특별 유적지', '호아르 고도 (古都)'],
    fr: ['VESTIGE HISTORIQUE ET CULTUREL', 'ANCIENNE CAPITALE HOA LU'],
  },
  'bio-vua-dinh': {
    vi: ['THÂN THẾ VÀ SỰ NGHIỆP', 'VUA ĐINH TIÊN HOÀNG'],
    en: ['LIFE AND CAREER OF', 'KING DINH TIEN HOANG'],
    ko: ['생애와 위대한 업적', '딘띠엔호앙 황제'],
    fr: ['VIE ET ŒUVRE DU', 'ROI DINH TIEN HOANG'],
  },
  'bio-vua-le-dai-hanh': {
    vi: ['THÂN THẾ VÀ SỰ NGHIỆP', 'VUA LÊ ĐẠI HÀNH'],
    en: ['LIFE AND CAREER OF', 'KING LE DAI HANH'],
    ko: ['생애와 위대한 업적', '레다이한 황제'],
    fr: ['VIE ET ŒUVRE DU', 'ROI LE DAI HANH'],
  },
  'bio-vua-le-long-dinh': {
    vi: ['THÂN THẾ VÀ SỰ NGHIỆP', 'VUA LÊ LONG ĐĨNH'],
    en: ['LIFE AND CAREER OF', 'KING LE LONG DINH'],
    ko: ['생애와 업적', '레롱딘 황제'],
    fr: ['VIE ET ŒUVRE DU', 'ROI LE LONG DINH'],
  },
  'bio-duong-van-nga': {
    vi: ['THÁI HẬU', 'DƯƠNG VÂN NGA'],
    en: ['EMPRESS DOWAGER', 'DUONG VAN NGA'],
    ko: ['두 왕조의 황후', '즈엉반응아 태후'],
    fr: ['IMPÉRATRICE DOUAIRIÈRE', 'DUONG VAN NGA'],
  },
};

// Tên file .mp3 gộp nguyên bài cho từng mục (hỗ trợ cả m1..m5.mp3 lẫn codohoalu..duongvannga.mp3)
export const STORY_AUDIO_VERSION = '20261102';

export const STORY_AUDIO_SLUGS = {
  'intro-co-do': 'm1',
  'bio-vua-dinh': 'm2',
  'bio-vua-le-dai-hanh': 'm3',
  'bio-vua-le-long-dinh': 'm4',
  'bio-duong-van-nga': 'm5',
};

export const STORY_AUDIO_ALIASES = {
  'intro-co-do': [
    'm1',
    'codohoalu',
    'ElevenLabs_2026-11-03T01_47_50_Hoang Son - Warm & Soft_pvc_sp97_s53_sb84_v4',
  ],
  'bio-vua-dinh': ['m2', 'vuadinh'],
  'bio-vua-le-dai-hanh': ['m3', 'vualedaihanh'],
  'bio-vua-le-long-dinh': ['m4', 'vualelongdinh'],
  'bio-duong-van-nga': ['m5', 'duongvannga'],
};

export function estimateSpokenWeight(str = '') {
  let w = str.length;
  // Các năm lịch sử 3-4 chữ số (968, 980, 1010...) khi đọc thành lời dài gấp ~6 lần số ký tự
  const years = str.match(/\d{3,4}/g);
  if (years) w += years.length * 18;
  const smallNums = str.match(/\b\d{1,2}\b/g);
  if (smallNums) w += smallNums.length * 6;
  const romans = str.match(/\b(?:X|XI|XII|XV|XVI|XVII|XVIII)\b/g);
  if (romans) w += romans.length * 7;
  if (/[,;:]$/.test(str)) w += 7;
  else if (/[.!?]$/.test(str)) w += 4;
  return Math.max(3, w);
}

/**
 * Tách một câu thuyết minh thành các cụm từ / vế câu tự nhiên (theo dấu phẩy, chấm phẩy...)
 * để tô sáng (karaoke highlight) mượt mà đồng bộ theo giọng đọc.
 */
export function splitSentenceIntoPhrases(sentence = '') {
  const clean = (sentence || '').trim();
  if (!clean) return [];

  // Tách sau dấu phẩy, chấm phẩy, hai chấm, gạch ngang
  const rawClauses = clean
    .split(/(?<=[,;:])\s+|(?=\s+[—–-]\s+)/)
    .map((s) => s.trim())
    .filter(Boolean);

  const phrases = [];
  let cursor = 0;

  for (const clause of rawClauses) {
    const words = clause.split(/\s+/);
    // Nếu một vế không có dấu phẩy quá dài (> 9 từ), chia đôi nhẹ nhàng cho hiệu ứng highlight đẹp mắt
    if (words.length > 9) {
      const mid = Math.ceil(words.length / 2);
      const part1 = words.slice(0, mid).join(' ');
      const part2 = words.slice(mid).join(' ');
      for (const p of [part1, part2]) {
        const idx = clean.indexOf(p, cursor);
        const start = idx !== -1 ? idx : cursor;
        const end = start + p.length;
        cursor = end;
        phrases.push({
          text: p,
          charStart: start,
          charEnd: end,
          weight: estimateSpokenWeight(p),
        });
      }
    } else {
      const idx = clean.indexOf(clause, cursor);
      const start = idx !== -1 ? idx : cursor;
      const end = start + clause.length;
      cursor = end;
      phrases.push({
        text: clause,
        charStart: start,
        charEnd: end,
        weight: estimateSpokenWeight(clause),
      });
    }
  }

  return phrases;
}

export const STORY_SCENES = {
  /* =========================================================================
     1. DI TÍCH LỊCH SỬ - VĂN HÓA CỐ ĐÔ HOA LƯ (8 CẢNH / ĐẦY ĐỦ NỘI DUNG THUYẾT MINH)
     ========================================================================= */
  'intro-co-do': [
    {
      id: 'codo-step-1',
      image: '/images/menu/item-3-co-do.png',
      fallbackImage: '/images/home-cover.png',
      focusPos: 'center 42%',
      motion: 'kb-zoom-in-right',
      text: {
        vi: 'Di tích lịch sử - văn hóa Cố đô Hoa Lư là một quần thể di tích quốc gia đặc biệt. Lần đầu tiên trong lịch sử, Hoa Lư đã trở thành kinh đô của Nhà nước Phong kiến Trung ương tập quyền của Việt Nam. Nơi phát tích sự nghiệp 3 triều đại: Đinh - Tiền Lê và khởi đầu triều Lý.',
        en: 'Hoa Lu Ancient Capital is a Special National Monument, the first imperial capital of Vietnam’s centralized feudal state.',
        ko: '호아르 고도는 특별 국가 유적지이자, 베트남 최초의 중앙집권 봉건 국가 수도입니다.',
        fr: 'L’ancienne capitale Hoa Lu est un Monument national spécial, première capitale de l’État féodal centralisé du Vietnam.',
      },
    },
    {
      id: 'codo-step-2',
      image: '/images/menu/item-3-co-do.png',
      fallbackImage: '/images/home-cover.png',
      focusPos: 'center 42%',
      motion: 'kb-zoom-in-right',
      text: {
        vi: 'Năm 968, sau khi thống nhất đất nước, Đinh Bộ Lĩnh lên ngôi Hoàng đế, đặt Quốc hiệu Đại Cồ Việt, đóng đô ở Hoa Lư “đắp thành đào hào, làm cung điện, đặt triều nghi”. Năm 980, vua Lê Đại Hành lên ngôi kế tục sự nghiệp triều Đinh, ông đã cho xây dựng rất nhiều cung điện nguy nga, tráng lệ.',
        en: 'It was the historic cradle of three royal dynasties: the Dinh, the Early Le, and the dawn of the Ly dynasty.',
        ko: '이곳은 딘 왕조, 전레 왕조, 그리고 리 왕조의 서막을 연 세 왕조의 역사적 발상지입니다.',
        fr: 'Elle fut le berceau historique de trois dynasties : les Dinh, les Le antérieurs et l’aube de la dynastie des Ly.',
      },
    },
    {
      id: 'codo-step-3',
      image: '/images/stories/codo-1-kinh-do-968.jpg',
      fallbackImage: '/images/menu/item-3-co-do.png',
      focusPos: 'center 35%',
      motion: 'kb-pan-up',
      text: {
        vi: 'Trong điều kiện lịch sử của thế kỷ X, đất nước mới giành được độc lập tự chủ, chính quyền Phong kiến Trung ương tập quyền còn non trẻ. Vì vậy, Vua Đinh Tiên Hoàng và Vua Lê Đại Hành đã chọn vùng đất Hoa Lư hiểm trở để định đô, cũng là để xây dựng một quân thành kiên cố, “bất khả xâm phạm” đối phó với thù trong giặc ngoài.',
        en: 'In 968, Dinh Bo Linh ascended the throne as Emperor, named the nation Dai Co Viet, and built ramparts, moats, and palaces at Hoa Lu.',
        ko: '968년 딘보린은 황제에 즉위해 국호를 다이꼬비엣이라 정하고, 호아르에 성벽과 해자, 궁궐을 세웠습니다.',
        fr: 'En 968, Dinh Bo Linh devint Empereur, fonda le Dai Co Viet et fit bâtir remparts, douves et palais à Hoa Lu.',
      },
    },
    {
      id: 'codo-step-4',
      image: '/images/stories/codo-1-kinh-do-968.jpg',
      fallbackImage: '/images/menu/item-3-co-do.png',
      focusPos: 'center 35%',
      motion: 'kb-pan-up',
      text: {
        vi: 'Năm 1010, để đặt nền tảng vững chắc và toàn diện cho sự hưng thịnh của quốc gia phong kiến độc lập, vua Lý Thái Tổ đã dời đô ra thành Đại La, sau đổi là Thăng Long (Hà Nội ngày nay). Hoa Lư trở thành cố đô.',
        en: 'In 980, King Le Dai Hanh continued this legacy, turning Hoa Lu’s rugged limestone peaks into an impregnable mountain fortress.',
        ko: '980년 제위를 이은 레다이한 황제는 험준한 석회암 산지를 천연 요새로 삼아 난공불락의 군성을 구축했습니다.',
        fr: 'En 980, le roi Le Dai Hanh poursuivit cette œuvre, érigeant au cœur des pics calcaires une citadelle naturelle imprenable.',
      },
    },
    {
      id: 'codo-step-5',
      image: '/images/stories/codo-2-doi-do-1010.jpg',
      fallbackImage: '/images/home-cover.png',
      focusPos: 'center 36%',
      motion: 'kb-pan-left',
      text: {
        vi: 'Trải qua thăng trầm của lịch sử, các cung điện không còn nữa. Tương truyền, sau khi vua Lý Thái Tổ dời đô, để tưởng nhớ công lao của các vị anh hùng dân tộc có công dựng nước và giữ nước, triều Lý đã cho xây dựng một ngôi đền quay hướng Bắc.',
        en: 'In 1010, King Ly Thai To moved the capital to Dai La, renaming it Thang Long, and Hoa Lu became the sacred Ancient Capital.',
        ko: '1010년 리태조 황제가 다이라로 천도하여 탕롱이라 개칭하면서, 호아르는 신성한 옛 수도 고도가 되었습니다.',
        fr: 'En 1010, le roi Ly Thai To transféra la capitale à Dai La, rebaptisée Thang Long, faisant de Hoa Lu l’Ancienne Capitale.',
      },
    },
    {
      id: 'codo-step-6',
      image: '/images/stories/codo-2-doi-do-1010.jpg',
      fallbackImage: '/images/home-cover.png',
      focusPos: 'center 36%',
      motion: 'kb-pan-left',
      text: {
        vi: 'Tuy nhiên, ngôi đền triều Lý xây dựng không còn nữa. Các triều đại kế tiếp vẫn luôn hướng về Hoa Lư, cho tu bổ thêm nhiều công trình văn hóa - lịch sử, để hôm nay du khách về thăm quan, chiêm bái Cố đô Hoa Lư có dịp tìm hiểu sâu sắc hơn về vùng đất - một thời đã là đế đô danh tiếng, hiện còn để lại nhiều dấu tích huy hoàng.',
        en: 'Successive dynasties continually honored Hoa Lu, restoring historic monuments in tribute to the nation’s founding emperors.',
        ko: '역대 왕조들은 언제나 호아르를 기리며, 건국 선황들의 공덕을 추모하는 수많은 역사 유적을 중수했습니다.',
        fr: 'Les dynasties suivantes honorèrent fidèlement Hoa Lu en restaurant ses sanctuaires dédiés aux empereurs fondateurs.',
      },
    },
    {
      id: 'codo-step-7',
      image: '/images/home-cover.png',
      fallbackImage: '/images/menu/item-3-co-do.png',
      focusPos: 'center 52%',
      motion: 'kb-zoom-out',
      videoUrl: 'https://www.youtube.com/embed/ywA3UARioxk',
      text: {
        vi: 'Hiện nay, Cố đô Hoa Lư có hơn 30 di tích liên quan đến hai triều Đinh - Tiền Lê, đa dạng về loại hình thờ tự, gồm: lăng tẩm, đền, miếu, phủ, chùa. Một số di tích nổi tiếng như: chùa Nhất Trụ, Đền thờ Thục tiết công chúa, Phủ Kình Thiên, Xuyên Thủy động…',
        en: 'Today, Hoa Lu preserves over 30 temples, pagodas, and royal tombs, including Nhat Tru Pagoda and Xuyen Thuy Cave.',
        ko: '오늘날 호아르 고도에는 일주사, 낀티엔부, 쑤옌투이 동굴 등 30여 개의 사당과 사찰, 능묘 유적이 보존되어 있습니다.',
        fr: 'Aujourd’hui, Hoa Lu conserve plus de 30 temples, pagodes et tombeaux, dont la pagode Nhat Tru et la grotte Xuyen Thuy.',
      },
    },
    {
      id: 'codo-step-8',
      image: '/images/stories/codo-3-di-tich-ngay-nay.jpg',
      fallbackImage: '/images/home-cover.png',
      focusPos: 'center 38%',
      motion: 'kb-zoom-in-right',
      videoUrl: 'https://www.youtube.com/embed/ywA3UARioxk',
      text: {
        vi: 'Nhưng trong các di tích này tiêu biểu nhất, đặc sắc nhất phải kể đến là đền thờ vua Đinh Tiên Hoàng và đền thờ vua Lê Đại Hành. Hai công trình này được xây dựng và trùng tu kế tiếp nhau qua nhiều triều đại, nhưng hiện nay vẫn mang đậm nét phong cách kiến trúc thời Hậu Lê (Thế kỷ XVII).',
        en: 'Most iconic among them are the Temples of King Dinh Tien Hoang and King Le Dai Hanh, masterpieces of 17th-century architecture.',
        ko: '그중 가장 대표적인 유적은 17세기 전통 건축의 정수를 간직한 딘띠엔호앙 황제 사당과 레다이한 황제 사당입니다.',
        fr: 'Les plus remarquables demeurent les temples des rois Dinh Tien Hoang et Le Dai Hanh, joyaux d’architecture du XVIIe siècle.',
      },
    },
  ],

  /* =========================================================================
     2. THÂN THẾ VÀ SỰ NGHIỆP VUA ĐINH TIÊN HOÀNG (10 CÂU)
     ========================================================================= */
  'bio-vua-dinh': [
    {
      id: 'dinh-step-1',
      image: '/images/menu/item-4-vua-dinh.png',
      fallbackImage: '/images/menu/item-4-vua-dinh.png',
      focusPos: 'center 22%',
      motion: 'kb-zoom-in-right',
      text: {
        vi: 'Vua tên húy Đinh Bộ Lĩnh, sinh năm Giáp Thân (924), ở thôn Kim Lư.',
        en: 'The King’s given name was Dinh Bo Linh, born in the year of Giap Than (924), in Kim Lu hamlet.',
        ko: '황제의 휘는 딘보린이며, 갑신년(924년) 낌르 마을에서 태어났습니다.',
        fr: 'Le roi avait pour nom Dinh Bo Linh, né en l’an Giap Than (924), au hameau de Kim Lu.',
      },
    },
    {
      id: 'dinh-step-2',
      image: '/images/menu/item-4-vua-dinh.png',
      fallbackImage: '/images/menu/item-4-vua-dinh.png',
      focusPos: 'center 22%',
      motion: 'kb-zoom-in-right',
      text: {
        vi: 'Quê ông ở làng Đại Hữu, châu Đại Hoàng (nay là xã Gia Phương, huyện Gia Viễn, tỉnh Ninh Bình); cha là Thứ sử Hoan Châu Đinh Công Trứ.',
        en: 'His hometown was Dai Huu village, Dai Hoang prefecture (now Gia Phuong, Gia Vien, Ninh Binh), and his father was Governor Dinh Cong Tru.',
        ko: '고향은 대황주 대유마을(현재 닌빈성 자비엔현)이며, 부친은 환주 자사 딘꽁쯔였습니다.',
        fr: 'Originaire du village de Dai Huu à Ninh Binh, il était le fils du gouverneur Dinh Cong Tru.',
      },
    },
    {
      id: 'dinh-step-3',
      image: '/images/stories/dinh-1-co-lau-tap-tran.jpg',
      fallbackImage: '/images/menu/item-4-vua-dinh.png',
      focusPos: 'center 34%',
      motion: 'kb-pan-up',
      text: {
        vi: 'Cha mất sớm, cậu bé Bộ Lĩnh về quê sống cùng mẹ là bà Đàm Thị, hằng ngày đi chăn trâu và lấy bông lau làm cờ tập trận.',
        en: 'After his father passed away early, young Bo Linh lived with his mother Dam Thi, herding buffaloes and staging reed-flag battle drills.',
        ko: '부친이 일찍 세상을 떠나자 모친 담씨와 고향에서 지내며, 매일 물소를 치고 갈대꽃을 깃발 삼아 진법을 익혔습니다.',
        fr: 'Orphelin de père très jeune, il vécut avec sa mère Dam Thi, gardant les buffles et s’exerçant avec des étendards de roseaux.',
      },
    },
    {
      id: 'dinh-step-4',
      image: '/images/stories/dinh-1-co-lau-tap-tran.jpg',
      fallbackImage: '/images/menu/item-4-vua-dinh.png',
      focusPos: 'center 34%',
      motion: 'kb-pan-up',
      text: {
        vi: 'Mỗi khi thắng trận, các bạn tôn ông làm trưởng, khoanh chéo tay làm kiệu khiêng và cầm hoa lau rước như nghi vệ Thiên tử.',
        en: 'Whenever victorious, village boys hailed him as leader, crossing their arms as a palanquin and escorting him with reed plumes like an Emperor.',
        ko: '전투 놀이에서 이길 때마다 아이들은 그를 대장으로 받들고, 팔짱을 껴 가마를 만들어 천자의 행차처럼 모셨습니다.',
        fr: 'À chaque victoire, ses compagnons le portaient sur leurs bras croisés en palanquin, l’escortant de roseaux tel un Empereur.',
      },
    },
    {
      id: 'dinh-step-5',
      image: '/images/stories/dinh-2-dep-12-su-quan.jpg',
      fallbackImage: '/images/menu/item-4-vua-dinh.png',
      focusPos: 'center 35%',
      motion: 'kb-pan-left',
      text: {
        vi: 'Năm 944, Ngô Quyền băng hà, các hào trưởng nổi lên cát cứ mỗi người một phương, sử gọi là loạn 12 sứ quân.',
        en: 'In 944, after Ngo Quyen passed away, regional warlords carved up the realm in the conflict known as the Anarchy of the 12 Warlords.',
        ko: '944년 응오꾸옌이 승하하자 각지 호족들이 할거하며 나라가 분열되는 12사군의 난이 일어났습니다.',
        fr: 'En 944, après la mort de Ngo Quyen, des chefs locaux divisèrent le pays lors de l’Anarchie des 12 seigneurs de guerre.',
      },
    },
    {
      id: 'dinh-step-6',
      image: '/images/stories/dinh-2-dep-12-su-quan.jpg',
      fallbackImage: '/images/menu/item-4-vua-dinh.png',
      focusPos: 'center 35%',
      motion: 'kb-pan-left',
      text: {
        vi: 'Đinh Bộ Lĩnh tụ nghĩa ở động Hoa Lư, nhận binh quyền từ Trần Lãm rồi dẹp yên 12 sứ quân, được tôn xưng là Vạn Thắng Vương.',
        en: 'Raising forces in Hoa Lu and uniting with Tran Lam, Dinh Bo Linh subdued all 12 warlords and was acclaimed King of Ten Thousand Victories.',
        ko: '호아르에서 의병을 일으켜 쩐람의 병권을 물려받은 딘보린은 12사군을 평정하고 만승왕이라 칭송받았습니다.',
        fr: 'Ralliant les troupes de Tran Lam à Hoa Lu, Dinh Bo Linh soumit les 12 seigneurs et fut proclamé Roi des Dix Mille Victoires.',
      },
    },
    {
      id: 'dinh-step-7',
      image: '/images/stories/dinh-3-hoang-de-dai-co-viet.jpg',
      fallbackImage: '/images/menu/item-4-vua-dinh.png',
      focusPos: 'center 34%',
      motion: 'kb-zoom-in-right',
      text: {
        vi: 'Năm 968, ông lên ngôi Hoàng đế, đặt quốc hiệu Đại Cồ Việt, đóng đô ở Hoa Lư, mở nền chính thống độc lập, tự chủ.',
        en: 'In 968, he ascended the throne as Emperor, proclaimed the nation Dai Co Viet at Hoa Lu, and founded Vietnam’s imperial orthodoxy.',
        ko: '968년 황제에 즉위하여 국호를 다이꼬비엣이라 선포하고 호아르에 도읍을 정해 자주독립의 정통 기틀을 열었습니다.',
        fr: 'En 968, il monta sur le trône d’Empereur, fonda le Dai Co Viet à Hoa Lu et inaugura la légitimité impériale indépendante.',
      },
    },
    {
      id: 'dinh-step-8',
      image: '/images/stories/dinh-3-hoang-de-dai-co-viet.jpg',
      fallbackImage: '/images/menu/item-4-vua-dinh.png',
      focusPos: 'center 34%',
      motion: 'kb-zoom-in-right',
      text: {
        vi: 'Năm 971, nhà vua định phẩm hàm quan văn võ, phong chức tứ trụ triều đình và xây dựng 10 đạo quân hùng mạnh bảo vệ Tổ quốc.',
        en: 'In 971, the Emperor established civil and military ranks, appointed the Four Court Pillars, and organized a ten-army military for national defense.',
        ko: '971년 문무 관직의 품계를 정하고 사주 대신을 임명했으며, 10도 군대 체제를 구축해 국방을 굳건히 다졌습니다.',
        fr: 'En 971, l’Empereur institua les rangs de la cour, nomma les Quatre Piliers et forma une puissante armée de dix corps.',
      },
    },
    {
      id: 'dinh-step-9',
      image: '/images/stories/dinh-4-thai-binh-hung-bao-cheo.jpg',
      fallbackImage: '/images/menu/item-4-vua-dinh.png',
      focusPos: 'center 36%',
      motion: 'kb-zoom-out',
      text: {
        vi: 'Nhà vua đẩy mạnh khẩn hoang, cho đúc Thái Bình hưng bảo, đồng tiền đầu tiên của nước ta, và đưa Hoa Lư thành cái nôi nghệ thuật hát chèo.',
        en: 'He promoted land reclamation, minted Vietnam’s first coin Thai Binh Hung Bao, and made Hoa Lu the cradle of traditional Cheo opera.',
        ko: '개간과 농업을 장려하고 최초의 화폐 태평흥보를 주조했으며, 호아르를 전통 가극 쩨오의 발상지로 꽃피웠습니다.',
        fr: 'Il encouragea l’agriculture, fit frapper la première monnaie Thai Binh Hung Bao et fit de Hoa Lu le berceau de l’art Cheo.',
      },
    },
    {
      id: 'dinh-step-10',
      image: '/images/menu/item-4-vua-dinh.png',
      fallbackImage: '/images/menu/item-4-vua-dinh.png',
      focusPos: 'center 22%',
      motion: 'kb-pan-up',
      text: {
        vi: 'Tháng 10 năm Kỷ Mão (979), nhà vua băng hà, hưởng thọ 56 tuổi, mãi được tôn vinh là vị anh hùng dân tộc thống nhất đất nước.',
        en: 'In October 979, the Emperor passed away at age 56, eternally revered as the national hero who reunified the homeland.',
        ko: '기묘년(979년) 10월 향년 56세로 붕어하셨으며, 민족 통일을 이룩한 위대한 영웅으로 영원히 추앙받고 있습니다.',
        fr: 'Éteint en octobre 979 à l’âge de 56 ans, il demeure à jamais vénéré comme le héros de la réunification nationale.',
      },
    },
  ],

  /* =========================================================================
     3. THÂN THẾ VÀ SỰ NGHIỆP VUA LÊ ĐẠI HÀNH (9 CÂU)
     ========================================================================= */
  'bio-vua-le-dai-hanh': [
    {
      id: 'le-step-1',
      image: '/images/menu/item-5-vua-le-dai-hanh.png',
      fallbackImage: '/images/menu/item-5-vua-le-dai-hanh.png',
      focusPos: 'center 22%',
      motion: 'kb-zoom-in-right',
      text: {
        vi: 'Vua tên húy là Lê Hoàn, sinh năm Tân Sửu (941) tại châu Ái (nay thuộc huyện Thọ Xuân, tỉnh Thanh Hóa).',
        en: 'The King’s given name was Le Hoan, born in the year of Tan Suu (941), in Ai Chau (now Tho Xuan, Thanh Hoa province).',
        ko: '황제의 휘는 레호안이며, 신축년(941년) 애주(현재 탄호아성 토쑤언현)에서 태어났습니다.',
        fr: 'Le roi avait pour nom Le Hoan, né en l’an Tan Suu (941), à Ai Chau (actuelle province de Thanh Hoa).',
      },
    },
    {
      id: 'le-step-2',
      image: '/images/stories/le-1-thap-dao-len-ngoi.jpg',
      fallbackImage: '/images/menu/item-5-vua-le-dai-hanh.png',
      focusPos: 'center 34%',
      motion: 'kb-pan-up',
      text: {
        vi: 'Thời trẻ, ông theo giúp Nam Việt Vương Đinh Liễn, lập nhiều chiến công dẹp loạn 12 sứ quân, được vua Đinh phong chức Thập đạo tướng quân.',
        en: 'Serving Prince Dinh Lien in his youth, he distinguished himself against the 12 warlords and was appointed Commander of Ten Armies.',
        ko: '젊은 시절 남월왕 딘리엔을 보좌하며 12사군 평정에 큰 공을 세워, 딘 황제로부터 십도장군에 임명되었습니다.',
        fr: 'Servant dans sa jeunesse le prince Dinh Lien, il s’illustra contre les 12 seigneurs et fut nommé Commandant des Dix Armées.',
      },
    },
    {
      id: 'le-step-3',
      image: '/images/stories/le-1-thap-dao-len-ngoi.jpg',
      fallbackImage: '/images/menu/item-5-vua-le-dai-hanh.png',
      focusPos: 'center 34%',
      motion: 'kb-pan-up',
      text: {
        vi: 'Năm 980, trước họa xâm lăng của nhà Tống, Lê Hoàn lên ngôi Hoàng đế, lập nên triều Tiền Lê, đặt niên hiệu Thiên Phúc.',
        en: 'In 980, facing imminent Song invasion, Le Hoan ascended the throne as Emperor, founding the Early Le dynasty with the reign era Thien Phuc.',
        ko: '980년 송나라 침략의 위기 속에 레호안은 황제에 추대되어 전레 왕조를 열고 연호를 천복이라 정했습니다.',
        fr: 'En 980, face à la menace d’invasion Song, Le Hoan devint Empereur et fonda la dynastie des Le antérieurs, ère Thien Phuc.',
      },
    },
    {
      id: 'le-step-4',
      image: '/images/stories/le-2-pha-tong-bach-dang.jpg',
      fallbackImage: '/images/menu/item-5-vua-le-dai-hanh.png',
      focusPos: 'center 36%',
      motion: 'kb-pan-left',
      text: {
        vi: 'Đầu năm 981, nhà vua trực tiếp cầm quân đóng cọc trên sông Bạch Đằng và phục kích tại Chi Lăng, tiêu diệt tướng giặc Hầu Nhân Bảo.',
        en: 'In early 981, the Emperor personally commanded stake traps on the Bach Dang River and an ambush at Chi Lang, defeating General Hau Nhan Bao.',
        ko: '981년 초 황제는 직접 박당강에 말뚝 진지를 세우고 찌랑에서 매복전을 펼쳐 송나라 장수 후인보를 격파했습니다.',
        fr: 'Au début de 981, l’Empereur fit planter des pieux dans le fleuve Bach Dang et tendit une embuscade à Chi Lang, éliminant le général Hau Nhan Bao.',
      },
    },
    {
      id: 'le-step-5',
      image: '/images/stories/le-2-pha-tong-bach-dang.jpg',
      fallbackImage: '/images/menu/item-5-vua-le-dai-hanh.png',
      focusPos: 'center 36%',
      motion: 'kb-pan-left',
      text: {
        vi: 'Quân Tống đại bại, vua Tống phải xuống chiếu rút quân; năm 982, nhà vua tiếp tục bình định phương Nam, giữ vững bờ cõi Đại Cồ Việt.',
        en: 'Crushed in battle, the Song court ordered a full retreat; in 982, the Emperor secured the southern border, safeguarding Dai Co Viet.',
        ko: '대패한 송나라는 철군 조서를 내렸고, 982년 황제는 남방 변경까지 평정하여 다이꼬비엣의 자주독립을 굳건히 지켰습니다.',
        fr: 'Vaincue, la cour des Song dut battre en retraite ; en 982, le roi pacifica le Sud, consolidant la souveraineté du Dai Co Viet.',
      },
    },
    {
      id: 'le-step-6',
      image: '/images/stories/le-3-thien-phuc-dao-kenh.jpg',
      fallbackImage: '/images/menu/item-5-vua-le-dai-hanh.png',
      focusPos: 'center 36%',
      motion: 'kb-zoom-in-right',
      text: {
        vi: 'Đất nước bình yên, năm 984, nhà vua cho đúc tiền Thiên Phúc phục vụ giao thương và chăm lo phát triển nông nghiệp.',
        en: 'With peace restored, in 984, the Emperor minted Thien Phuc bronze coins for commerce and championed agricultural growth.',
        ko: '나라가 평안해지자 984년 천복 동전을 주조해 교역을 활성화하고 농업 생산을 적극적으로 장려했습니다.',
        fr: 'La paix revenue, il fit frapper en 984 la monnaie Thien Phuc pour le commerce et développa activement l’agriculture.',
      },
    },
    {
      id: 'le-step-7',
      image: '/images/stories/le-3-thien-phuc-dao-kenh.jpg',
      fallbackImage: '/images/menu/item-5-vua-le-dai-hanh.png',
      focusPos: 'center 36%',
      motion: 'kb-zoom-in-right',
      text: {
        vi: 'Ông cho đào sông từ núi Đồng Cổ đến sông Bà Hòa và đắp tuyến đường bộ nối từ cửa biển Nam Giới vào tới châu Địa Lý.',
        en: 'He excavated the historic canal from Mount Dong Co to Ba Hoa River and built overland highways stretching south to Dia Ly prefecture.',
        ko: '동고산에서 바호아강까지 최초의 운하를 파고, 남계 해안에서 지리주까지 육로 교통망을 개척했습니다.',
        fr: 'Il fit creuser le canal reliant le mont Dong Co à la rivière Ba Hoa et ouvrit une grande route terrestre vers le Sud.',
      },
    },
    {
      id: 'le-step-8',
      image: '/images/stories/le-4-ngoai-giao-su-tong.jpg',
      fallbackImage: '/images/menu/item-5-vua-le-dai-hanh.png',
      focusPos: 'center 30%',
      motion: 'kb-zoom-out',
      text: {
        vi: 'Năm 1002, nhà vua đổi 10 đạo thành lộ, phủ, châu và ngoại giao khôn khéo khiến sứ Tống cảm phục làm thơ ca ngợi: “Ngoài trời còn có trời xa nữa”.',
        en: 'In 1002, he reorganized administration into circuits and prefectures, while his deft diplomacy moved Song envoys to praise Vietnam in verse.',
        ko: '1002년 전국을 노·부·주 행정 체제로 개편하고 당당한 외교를 펼쳐 송나라 사신도 시를 지어 황제의 위엄을 찬탄했습니다.',
        fr: 'En 1002, il réforma l’administration territoriale et mena une diplomatie habile qui força l’admiration des émissaires Song.',
      },
    },
    {
      id: 'le-step-9',
      image: '/images/menu/item-5-vua-le-dai-hanh.png',
      fallbackImage: '/images/menu/item-5-vua-le-dai-hanh.png',
      focusPos: 'center 22%',
      motion: 'kb-pan-up',
      text: {
        vi: 'Năm 1005, nhà vua băng hà, hưởng thọ 65 tuổi, lưu danh bậc anh hùng dân tộc kháng Tống, bình Chiêm, dựng xây quốc gia hưng thịnh.',
        en: 'In 1005, the Emperor passed away at age 65, forever honored as a brilliant national hero who defended and enriched the nation.',
        ko: '1005년 향년 65세로 붕어하셨으며, 외적을 물리치고 국력을 융성케 한 민족의 영웅으로 길이 빛나고 있습니다.',
        fr: 'Éteint en 1005 à l’âge de 65 ans, il reste honoré comme le grand souverain ayant défendu et fait prospérer la nation.',
      },
    },
  ],

  /* =========================================================================
     4. THÂN THẾ VÀ SỰ NGHIỆP VUA LÊ LONG ĐĨNH (6 CÂU)
     ========================================================================= */
  'bio-vua-le-long-dinh': [
    {
      id: 'longdinh-step-1',
      image: '/images/menu/item-6-vua-le-long-dinh.png',
      fallbackImage: '/images/menu/item-6-vua-le-long-dinh.png',
      focusPos: 'center 22%',
      motion: 'kb-zoom-in-right',
      text: {
        vi: 'Vua tên húy là Chí Trung, sinh năm 985, con thứ năm của vua Lê Đại Hành.',
        en: 'The King’s given name was Chi Trung, born in 985, the fifth son of Emperor Le Dai Hanh.',
        ko: '황제의 휘는 찌쭝이며, 985년에 레다이한 황제의 다섯째 아들로 태어났습니다.',
        fr: 'Le roi avait pour nom Chi Trung, né en 985, cinquième fils de l’Empereur Le Dai Hanh.',
      },
    },
    {
      id: 'longdinh-step-2',
      image: '/images/stories/longdinh-1-ke-vi-chan-chinh.jpg',
      fallbackImage: '/images/menu/item-6-vua-le-long-dinh.png',
      focusPos: 'center 34%',
      motion: 'kb-pan-up',
      text: {
        vi: 'Sau khi lên nối ngôi, Lê Long Đĩnh chấn chỉnh triều đình, bang giao với nhà Tống và dẹp yên các cuộc nổi dậy ở vùng biên viễn.',
        en: 'Upon ascending the throne, Le Long Dinh reorganized court discipline, maintained Song diplomacy, and quelled frontier uprisings.',
        ko: '즉위 후 레롱딘은 조정의 기강을 정비하고 송나라와 수교하며, 변경 지역의 반란을 직접 평정했습니다.',
        fr: 'Monté sur le trône, Le Long Dinh réorganisa la cour, maintint la paix avec les Song et pacifica les régions frontalières.',
      },
    },
    {
      id: 'longdinh-step-3',
      image: '/images/stories/longdinh-2-thinh-kinh-giao-thuong.jpg',
      fallbackImage: '/images/menu/item-6-vua-le-long-dinh.png',
      focusPos: 'center 35%',
      motion: 'kb-pan-left',
      text: {
        vi: 'Năm 1007, nhà vua sai sứ giả Minh Sưởng và Hoàng Thành Nhã sang nhà Tống dâng biểu thỉnh trọn bộ Cửu kinh và Đại tạng kinh.',
        en: 'In 1007, he dispatched envoys Minh Suong and Hoang Thanh Nha to the Song court to acquire the Nine Classics and Buddhist Tripitaka.',
        ko: '1007년 사신 민쓰엉과 호앙타인냐를 송나라에 보내 유교 구경과 불교 대장경을 청하여 반입했습니다.',
        fr: 'En 1007, il envoya Minh Suong et Hoang Thanh Nha auprès des Song pour obtenir les Neuf Classiques et le Tripitaka bouddhique.',
      },
    },
    {
      id: 'longdinh-step-4',
      image: '/images/stories/longdinh-2-thinh-kinh-giao-thuong.jpg',
      fallbackImage: '/images/menu/item-6-vua-le-long-dinh.png',
      focusPos: 'center 35%',
      motion: 'kb-pan-left',
      text: {
        vi: 'Nhà vua còn cho mở rộng mua bán, trao đổi hàng hóa với người Tống tại Liêm Châu và trấn Như Hồng.',
        en: 'He also expanded cross-border trade and merchandise exchange with Song merchants at Liem Chau and Nhu Hong.',
        ko: '또한 염주와 여홍진에서 송나라 상인들과의 물자 교역과 통상을 활발히 확대했습니다.',
        fr: 'Il développa également les échanges commerciaux avec les marchands Song à Liem Chau et Nhu Hong.',
      },
    },
    {
      id: 'longdinh-step-5',
      image: '/images/stories/longdinh-3-chuyen-giao-nha-ly.jpg',
      fallbackImage: '/images/menu/item-6-vua-le-long-dinh.png',
      focusPos: 'center 36%',
      motion: 'kb-zoom-out',
      text: {
        vi: 'Năm 1009, nhà vua băng hà, hưởng thọ 24 tuổi; triều Tiền Lê kết thúc, triều thần suy tôn Lý Công Uẩn lên ngôi Hoàng đế.',
        en: 'In 1009, the King passed away at age 24, ending the Early Le dynasty as court officials acclaimed Ly Cong Uan as Emperor.',
        ko: '1009년 향년 24세로 붕어하면서 전레 왕조가 막을 내렸고, 대신들은 리꽁우언을 새 황제로 추대했습니다.',
        fr: 'En 1009, le roi s’éteignit à 24 ans, marquant la fin des Le antérieurs, et la cour porta Ly Cong Uan sur le trône.',
      },
    },
    {
      id: 'longdinh-step-6',
      image: '/images/stories/longdinh-3-chuyen-giao-nha-ly.jpg',
      fallbackImage: '/images/menu/item-6-vua-le-long-dinh.png',
      focusPos: 'center 36%',
      motion: 'kb-zoom-out',
      text: {
        vi: 'Năm 1010, để phát triển đất nước lâu dài, nhà Lý dời đô từ Hoa Lư ra thành Thăng Long.',
        en: 'In 1010, for long-term national development, the Ly dynasty moved the imperial capital from Hoa Lu to Thang Long.',
        ko: '1010년 국가의 장구한 발전을 위해 리 왕조는 수도를 호아르에서 탕롱으로 옮겼습니다.',
        fr: 'En 1010, pour assurer l’essor du pays, la dynastie Ly transféra la capitale de Hoa Lu à Thang Long.',
      },
    },
  ],

  /* =========================================================================
     5. THÁI HẬU DƯƠNG VÂN NGA (7 CÂU)
     ========================================================================= */
  'bio-duong-van-nga': [
    {
      id: 'dvn-step-1',
      image: '/images/menu/item-7-duong-van-nga.png',
      fallbackImage: '/images/menu/item-7-duong-van-nga.png',
      focusPos: 'center 22%',
      motion: 'kb-zoom-in-right',
      text: {
        vi: 'Chính sử ghi là Dương Hậu; bà tên là Dương Vân Nga, con gái ông Dương Thế Hiển ở huyện Nho Quan, tỉnh Ninh Bình.',
        en: 'Recorded in annals as Empress Duong, Duong Van Nga was the daughter of Duong The Hien from Nho Quan, Ninh Binh province.',
        ko: '정사에 양후로 기록된 즈엉반응아 태후는 닌빈성 뇨꽌현 출신 즈엉테히엔의 딸입니다.',
        fr: 'Appelée l’Impératrice Duong dans les annales, Duong Van Nga était la fille de Duong The Hien, originaire de Ninh Binh.',
      },
    },
    {
      id: 'dvn-step-2',
      image: '/images/stories/dvn-1-van-nuoc-979.jpg',
      fallbackImage: '/images/menu/item-7-duong-van-nga.png',
      focusPos: 'center 34%',
      motion: 'kb-pan-up',
      text: {
        vi: 'Khi vua Đinh Tiên Hoàng băng hà năm 979, ấu chúa Đinh Toàn mới 6 tuổi lên nối ngôi giữa lúc nhà Tống lăm le xâm lược.',
        en: 'When King Dinh Tien Hoang passed away in 979, six-year-old Dinh Toan took the throne just as Song forces threatened invasion.',
        ko: '979년 딘띠엔호앙 황제가 붕어하고 6세 어린 왕 딘또안이 즉위하자, 송나라가 침략의 기회를 노렸습니다.',
        fr: 'À la mort du roi Dinh Tien Hoang en 979, l’enfant-roi Dinh Toan âgé de six ans monta sur le trône face à la menace Song.',
      },
    },
    {
      id: 'dvn-step-3',
      image: '/images/stories/dvn-1-van-nuoc-979.jpg',
      fallbackImage: '/images/menu/item-7-duong-van-nga.png',
      focusPos: 'center 34%',
      motion: 'kb-pan-up',
      text: {
        vi: 'Vận nước ngàn cân treo sợi tóc, Tổ quốc đang cần một vị tướng tài đức chèo lái con thuyền Đại Cồ Việt vượt qua binh lửa.',
        en: 'With national survival hanging by a thread, the homeland needed a proven military leader to steer Dai Co Viet through the storm.',
        ko: '백척간두의 위기 속에서 조국은 전란의 파도를 헤쳐 나갈 지략과 덕망을 겸비한 영웅을 필요로 했습니다.',
        fr: 'Dans ce péril extrême, la patrie avait besoin d’un chef militaire d’exception pour sauver le Dai Co Viet.',
      },
    },
    {
      id: 'dvn-step-4',
      image: '/images/stories/dvn-2-trao-ao-long-con.jpg',
      fallbackImage: '/images/menu/item-7-duong-van-nga.png',
      focusPos: 'center 32%',
      motion: 'kb-pan-left',
      text: {
        vi: 'Hy sinh quyền lợi riêng của dòng tộc, Thái hậu Dương Vân Nga đã lấy áo long cổn trao cho Thập đạo tướng quân Lê Hoàn lên ngôi Hoàng đế.',
        en: 'Placing nation above dynastic interest, Empress Dowager Duong Van Nga bestowed the Imperial Dragon Robe upon General Le Hoan.',
        ko: '가문의 사사로운 이익보다 민족의 운명을 앞세운 태후는 용포를 십도장군 레호안에게 전하며 황제 즉위를 결단했습니다.',
        fr: 'Plaçant la patrie au-dessus des intérêts dynastiques, elle remit la robe impériale au général Le Hoan pour qu’il devienne Empereur.',
      },
    },
    {
      id: 'dvn-step-5',
      image: '/images/stories/dvn-2-trao-ao-long-con.jpg',
      fallbackImage: '/images/menu/item-7-duong-van-nga.png',
      focusPos: 'center 32%',
      motion: 'kb-pan-left',
      text: {
        vi: 'Quyết định sáng suốt, hợp lòng quân dân ấy đã giúp vua Lê Đại Hành kháng Tống, bình Chiêm đại thắng, giữ yên bờ cõi.',
        en: 'That visionary decision united army and people, enabling Emperor Le Dai Hanh to defeat the Song invasion and secure the realm.',
        ko: '군민의 뜻을 모은 이 현명한 결단 덕분에 레다이한 황제는 송나라 대군을 격파하고 강토를 굳건히 수호했습니다.',
        fr: 'Cette décision clairvoyante rallia l’armée et le peuple, permettant à Le Dai Hanh de repousser l’invasion Song.',
      },
    },
    {
      id: 'dvn-step-6',
      image: '/images/stories/dvn-3-luong-trieu-hoang-hau.jpg',
      fallbackImage: '/images/menu/item-7-duong-van-nga.png',
      focusPos: 'center 28%',
      motion: 'kb-zoom-out',
      text: {
        vi: 'Năm 982, sau ngày khải hoàn, Lê Hoàn lập bà làm Hoàng hậu, để lại tấm gương người phụ nữ yêu nước, thức thời ở thế kỷ X.',
        en: 'In 982, after his triumph, Le Hoan crowned her Empress—honoring a patriotic, visionary woman of the 10th century.',
        ko: '982년 개선 후 레호안은 태후를 황후로 책봉하니, 10세기 구국의 지혜를 보여준 애국 여성의 귀감이 되었습니다.',
        fr: 'En 982, après la victoire, Le Hoan la couronna Impératrice, symbole de patriotisme et de sagesse politique au Xe siècle.',
      },
    },
    {
      id: 'dvn-step-7',
      image: '/images/menu/item-7-duong-van-nga.png',
      fallbackImage: '/images/menu/item-7-duong-van-nga.png',
      focusPos: 'center 22%',
      motion: 'kb-pan-up',
      text: {
        vi: 'Sau khi bà mất, nhân dân tạc tượng thờ trang trọng tại chính cung đền thờ vua Lê Đại Hành để muôn đời tri ân công trạng.',
        en: 'After her passing, the people enshrined her statue in the Main Sanctuary of King Le Dai Hanh Temple in eternal gratitude.',
        ko: '승하 후 백성들은 레다이한 황제 사당 정궁에 태후의 존상을 모셔 그 높은 공덕을 천추에 기리고 있습니다.',
        fr: 'Après sa disparition, le peuple érigea sa statue au sanctuaire du temple du roi Le Dai Hanh en signe de reconnaissance éternelle.',
      },
    },
  ],
};
