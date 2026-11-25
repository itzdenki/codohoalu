import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { createRequire } from 'node:module';
import { VISIT_TOPICS } from '../public/assets/js/visit-topics.js';
import { matchTopicFromQR, describeCameraError } from '../public/assets/js/qr-scanner.js';

const require = createRequire(import.meta.url);
const jsQR = require('jsqr');

function decodePngToRgba(filePath) {
  const buf = fs.readFileSync(filePath);
  assert.deepEqual(buf.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), `Invalid PNG: ${filePath}`);
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idatChunks = [];
  let offset = 8;
  while (offset < buf.length) {
    const length = buf.readUInt32BE(offset);
    const type = buf.subarray(offset + 4, offset + 8).toString('ascii');
    const data = buf.subarray(offset + 8, offset + 8 + length);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    } else if (type === 'IEND') {
      break;
    }
    offset += 12 + length;
  }
  assert.equal(bitDepth, 8, `Unsupported bitDepth ${bitDepth}`);
  const bpp = colorType === 6 ? 4 : colorType === 2 ? 3 : colorType === 0 ? 1 : 0;
  assert.ok(bpp > 0, `Unsupported colorType ${colorType}`);
  const raw = zlib.inflateSync(Buffer.concat(idatChunks));
  const stride = width * bpp;
  const recon = Buffer.alloc(height * stride);
  const paeth = (a, b, c) => {
    const p = a + b - c;
    const pa = Math.abs(p - a);
    const pb = Math.abs(p - b);
    const pc = Math.abs(p - c);
    return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
  };
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const rowIn = y * (stride + 1) + 1;
    const rowOut = y * stride;
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? recon[rowOut + x - bpp] : 0;
      const b = y > 0 ? recon[rowOut - stride + x] : 0;
      const c = x >= bpp && y > 0 ? recon[rowOut - stride + x - bpp] : 0;
      const v = raw[rowIn + x];
      let out = v;
      if (filter === 1) out = (v + a) & 0xff;
      else if (filter === 2) out = (v + b) & 0xff;
      else if (filter === 3) out = (v + ((a + b) >> 1)) & 0xff;
      else if (filter === 4) out = (v + paeth(a, b, c)) & 0xff;
      recon[rowOut + x] = out;
    }
  }
  const rgba = new Uint8ClampedArray(width * height * 4);
  for (let i = 0, p = 0; i < width * height; i++, p += 4) {
    if (bpp === 4) {
      rgba[p] = recon[i * 4];
      rgba[p + 1] = recon[i * 4 + 1];
      rgba[p + 2] = recon[i * 4 + 2];
      rgba[p + 3] = recon[i * 4 + 3];
    } else if (bpp === 3) {
      rgba[p] = recon[i * 3];
      rgba[p + 1] = recon[i * 3 + 1];
      rgba[p + 2] = recon[i * 3 + 2];
      rgba[p + 3] = 255;
    } else {
      const g = recon[i];
      rgba[p] = g;
      rgba[p + 1] = g;
      rgba[p + 2] = g;
      rgba[p + 3] = 255;
    }
  }
  return { width, height, rgba };
}

function decodeQrFile(filePath) {
  const { width, height, rgba } = decodePngToRgba(filePath);
  const res = jsQR(rgba, width, height);
  assert.ok(res && res.data, `Could not decode QR from ${filePath}`);
  return res.data;
}

test('đủ 15 mã QR (1 trang chủ + 14 mục nội dung) giải mã đúng và khớp chính xác', () => {
  const manifest = JSON.parse(fs.readFileSync(path.resolve('public/images/qr/manifest.json'), 'utf8'));
  assert.equal(manifest.count, 15);
  assert.equal(manifest.items.length, 15);

  // Home QR (both 00-home.png and qr-access.png)
  const homeDecoded = decodeQrFile(path.resolve('public/images/qr/00-home.png'));
  const accessDecoded = decodeQrFile(path.resolve('public/qr-access.png'));
  assert.equal(homeDecoded, accessDecoded);
  assert.match(homeDecoded, /^https:\/\/codohoalu\.pages\.dev\/$/);
  // Scanning Home QR inside the scanner must NOT match any of the 14 content pages
  assert.equal(matchTopicFromQR(homeDecoded), null);

  // All 14 content QRs decode and match their exact topic
  for (const topic of VISIT_TOPICS) {
    const file = path.resolve('public', topic.qrImage.replace(/^\//, ''));
    assert.ok(fs.existsSync(file), `Missing QR image: ${file}`);
    const decoded = decodeQrFile(file);
    assert.equal(decoded, `https://codohoalu.pages.dev/${topic.route}`);
    const matched = matchTopicFromQR(decoded);
    assert.ok(matched, `QR did not match topic ${topic.slug}`);
    assert.equal(matched.id, topic.id);
    assert.equal(matched.slug, topic.slug);
  }
});

test('bộ đối chiếu QR từ chối mã ngoài 14 mục nội dung và chấp nhận đúng biến thể URL hợp lệ', () => {
  assert.equal(matchTopicFromQR('http://localhost:3000/pages/tham-quan/den-vua-dinh')?.slug, 'den-vua-dinh');
  assert.equal(matchTopicFromQR('https://example.com/pages/tham-quan/den-vua-le/?lang=en')?.slug, 'den-vua-le');
  assert.equal(matchTopicFromQR('/pages/tham-quan/nha-khai-thanh')?.slug, 'nha-khai-thanh');

  for (const invalid of [
    '',
    '   ',
    'hello world',
    'https://google.com',
    'https://codohoalu.pages.dev/',
    'https://codohoalu.pages.dev/?qr=hoalu',
    'https://codohoalu.pages.dev/pages/dth/so-do',
    'https://codohoalu.pages.dev/pages/tham-quan/khong-ton-tai',
    'https://codohoalu.pages.dev/pages/tham-quan/den-vua-dinh/index_vi.html',
    '00020101021138570010A000000727',
  ]) {
    assert.equal(matchTopicFromQR(invalid), null, `Should reject: ${invalid}`);
  }
});

test('phân loại chính xác lỗi quyền và ngữ cảnh bảo mật camera', () => {
  assert.match(describeCameraError({ name: 'NotSupportedError' }, 'vi', false), /HTTPS/);
  assert.match(describeCameraError({ name: 'NotAllowedError' }, 'vi', true), /quyền camera/);
  assert.match(describeCameraError({ name: 'NotFoundError' }, 'vi', true), /Không tìm thấy camera/);
  assert.match(describeCameraError({ name: 'NotReadableError' }, 'vi', true), /ứng dụng hoặc tab khác/);
});
