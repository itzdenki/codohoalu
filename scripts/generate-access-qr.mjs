import QRCode from 'qrcode';
// Dùng: node scripts/generate-access-qr.mjs https://ten-mien-cua-ban.vn
const site = (process.argv[2] || process.env.SITE_URL || '').replace(/\/+$/, '');
if (!site) {
  console.error('Thiếu địa chỉ web. Ví dụ: node scripts/generate-access-qr.mjs https://ten-mien.vn');
  process.exit(1);
}
const key = process.env.NEXT_PUBLIC_QR_KEY || 'hoalu';
const url = `${site}/?qr=${encodeURIComponent(key)}`;
await QRCode.toFile('public/qr-access.png', url, { width: 800, margin: 2 });
console.log('Created public/qr-access.png ->', url);
