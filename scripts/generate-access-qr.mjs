import fs from 'node:fs/promises';
import path from 'node:path';
import QRCode from 'qrcode';
import { VISIT_TOPICS } from '../public/assets/js/visit-topics.js';

// Dùng: node scripts/generate-access-qr.mjs [https://codohoalu.pages.dev]
const site = (process.argv[2] || process.env.SITE_URL || 'https://codohoalu.pages.dev').replace(/\/+$/, '');
const qrDir = path.resolve('public/images/qr');
const options = {
  width: 800,
  margin: 2,
  errorCorrectionLevel: 'M',
  color: { dark: '#1a0c0a', light: '#ffffff' },
};

await fs.mkdir(qrDir, { recursive: true });

const manifest = [];

// 1. Home QR (00)
const homeUrl = `${site}/`;
const homeQrFile = path.join(qrDir, '00-home.png');
await QRCode.toFile(homeQrFile, homeUrl, options);
await fs.copyFile(homeQrFile, path.resolve('public/qr-access.png'));
manifest.push({
  number: 0,
  id: 'home',
  slug: 'home',
  title: 'Trang chủ — Cố đô Hoa Lư',
  file: '/images/qr/00-home.png',
  url: homeUrl,
});

// 2. 14 Content QRs (01..14)
for (const topic of VISIT_TOPICS) {
  const num = String(topic.number).padStart(2, '0');
  const filename = `${num}-${topic.slug}.png`;
  const url = `${site}/${topic.route}`;
  await QRCode.toFile(path.join(qrDir, filename), url, options);
  manifest.push({
    number: topic.number,
    id: topic.id,
    slug: topic.slug,
    title: topic.title,
    file: `/images/qr/${filename}`,
    url,
  });
}

await fs.writeFile(
  path.join(qrDir, 'manifest.json'),
  JSON.stringify({ site, count: manifest.length, items: manifest }, null, 2) + '\n',
  'utf8',
);

console.log(`Generated ${manifest.length} QR codes for ${site}:`);
for (const item of manifest) {
  console.log(`  [${String(item.number).padStart(2, '0')}] ${item.file} -> ${item.url}`);
}
