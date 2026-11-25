const slugs = ['gioi-thieu-di-tich','long-sang-nghi-mon-ngoai','nghi-mon-den-dinh','long-sang-san-rong','den-vua-dinh','phu-viet-den-dinh','nha-bia-den-dinh','nha-khai-thanh','nghi-mon-den-le','nha-tho-khong-tu','den-vua-le','phu-viet-den-le','hai-nha-bia-den-le','nha-trung-bay-di-san'];
const coverImages = [
  '01-toan-canh-co-do.jpg', '01-long-sang-nghi-mon-ngoai.jpg',
  '01-nghi-mon-ngoai.jpg', '01-long-sang-san-rong.jpg',
  '01-san-rong-bai-duong.jpg', '01-phu-viet-mat-truoc.jpg',
  '01-bia-hoang-dinh-1608.jpg', '01-nha-khai-thanh.jpg',
  '01-nghi-mon-ngoai-den-le.jpg', '01-nha-tho-khong-tu.jpg',
  '01-den-tho-vua-le.jpg', '01-khong-gian-den-vua-le.jpg',
  '01-nha-bia-ben-trai.jpg', '01-nha-trung-bay.jpg',
];
const titles = {
  vi: ['Giới thiệu khái quát di tích','Long sàng (vị trí ở gần Nghi môn ngoại)','Nghi môn ngoại và Nghi môn nội đền Đinh','Long sàng đền Đinh (vị trí ở sân đền Đinh)','Giới thiệu đền vua Đinh','Giới thiệu phù việt đền Đinh','Nhà bia đền Đinh','Nhà Khải Thánh','Nghi môn ngoại và Nghi môn nội đền Lê','Nhà thờ Khổng Tử','Giới thiệu đền vua Lê','Giới thiệu phù việt đền vua Lê','Hai nhà bia đền Lê','Nhà trưng bày di sản văn hóa thời Đinh – Tiền Lê'],
  en: ['Overview of the historic site','Dragon bed near the Outer Gate','Outer and Inner Gates of Đinh Temple','Dragon bed in Đinh Temple courtyard','Temple of King Đinh','Ceremonial axes of Đinh Temple','Stele house of Đinh Temple','Khải Thánh Hall','Outer and Inner Gates of Lê Temple','Temple of Confucius','Temple of King Lê','Ceremonial axes of Lê Temple','Two stele houses of Lê Temple','Đinh and Early Lê heritage exhibition'],
  fr: ['Présentation générale du site','Lit du Dragon près de la porte extérieure','Portes extérieure et intérieure du temple Đinh','Lit du Dragon dans la cour du temple Đinh','Temple du roi Đinh','Haches cérémonielles du temple Đinh','Pavillon des stèles du temple Đinh','Salle Khải Thánh','Portes extérieure et intérieure du temple Lê','Temple de Confucius','Temple du roi Lê','Haches cérémonielles du temple Lê','Deux pavillons des stèles du temple Lê','Exposition du patrimoine Đinh et Lê antérieurs'],
  ko: ['유적지 개요','외의문 근처의 용상','딘 왕 사당의 외의문과 내의문','딘 왕 사당 뜰의 용상','딘 왕 사당','딘 왕 사당의 의장용 도끼','딘 왕 사당의 비각','카이타인 사당','레 왕 사당의 외의문과 내의문','공자 사당','레 왕 사당','레 왕 사당의 의장용 도끼','레 왕 사당의 두 비각','딘·전레 시대 문화유산 전시관'],
  zh: ['遗迹概况','外仪门附近的龙床','丁王庙外仪门与内仪门','丁王庙庭院的龙床','丁王庙介绍','丁王庙的仪仗斧钺','丁王庙碑亭','启圣祠','黎王庙外仪门与内仪门','孔子庙','黎王庙介绍','黎王庙的仪仗斧钺','黎王庙的两座碑亭','丁朝与前黎朝文化遗产展馆'],
  ja: ['遺跡の概要','外儀門付近の龍床','丁王廟の外儀門と内儀門','丁王廟の中庭の龍床','丁王廟の紹介','丁王廟の儀仗斧鉞','丁王廟の碑亭','啓聖祠','黎王廟の外儀門と内儀門','孔子廟','黎王廟の紹介','黎王廟の儀仗斧鉞','黎王廟の二つの碑亭','丁朝・前黎朝の文化遺産展示館'],
};
export const VISIT_TOPICS = slugs.map((slug, index) => ({
  id: `visit-${String(index + 1).padStart(2, '0')}`, number: index + 1, sourceNumber: index + 1, slug,
  route: `pages/tham-quan/${slug}`, title: titles.vi[index],
  image: `/pages/tham-quan/${slug}/${coverImages[index]}`,
  qrImage: `/images/qr/${String(index + 1).padStart(2, '0')}-${slug}.png`,
  titles: Object.fromEntries(Object.entries(titles).map(([lang, values]) => [lang, values[index]])),
}));
export const visitTitle = (topic, lang = 'vi') => topic.titles?.[lang] || topic.title;
