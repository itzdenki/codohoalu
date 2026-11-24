const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, 'public');
const port = Number(process.argv[2] || process.env.PORT || 3000);
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml', '.mp3':'audio/mpeg', '.woff':'font/woff', '.woff2':'font/woff2', '.ico':'image/x-icon' };

function createServer() {
  return http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405, { Allow:'GET, HEAD' }); return res.end(); }
  let urlPath;
  try { urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); return res.end('Bad request'); }
  if (urlPath.includes('\\') || urlPath.includes('\0')) { res.writeHead(400); return res.end('Bad request'); }
  const requested = urlPath.replace(/\/+$/, '') === '/pages/photo-spots'
    ? path.join(root, 'index.html') : path.resolve(root, '.' + urlPath);
  if (requested !== root && !requested.startsWith(root + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.stat(requested, (err, info) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    const isAppRoute = /^\/pages\/(dth|ldh|tham-quan)\/[a-z0-9-]+\/?$/.test(urlPath);
    const contentPage = info.isDirectory() ? path.join(requested, 'index.html') : requested;
    const file = info.isDirectory() && isAppRoute && fs.existsSync(contentPage)
      ? path.join(root, 'index.html') : contentPage;
    fs.stat(file, (fileError, stat) => {
      if (fileError || !stat.isFile()) { res.writeHead(404); return res.end('Not found'); }
      const headers = { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Accept-Ranges':'bytes', 'Cache-Control':'no-cache', 'X-Content-Type-Options':'nosniff' };
      let start = 0, end = stat.size - 1, status = 200;
      if (req.headers.range) {
        const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
        if (!match || (!match[1] && !match[2])) { res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` }); return res.end(); }
        if (!match[1]) start = Math.max(stat.size - Number(match[2]), 0);
        else start = Number(match[1]);
        if (match[1] && match[2]) end = Math.min(Number(match[2]), end);
        if (start > end || start >= stat.size) { res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` }); return res.end(); }
        status = 206; headers['Content-Range'] = `bytes ${start}-${end}/${stat.size}`;
      }
      headers['Content-Length'] = Math.max(0, end - start + 1);
      res.writeHead(status, headers);
      if (req.method === 'HEAD' || stat.size === 0) return res.end();
      const stream = fs.createReadStream(file, { start, end });
      stream.on('error', () => res.destroy());
      stream.pipe(res);
    });
  });
  });
}

if (require.main === module) {
  createServer().listen(port, '0.0.0.0', () => console.log(`Cố đô Hoa Lư: http://localhost:${port}`));
}
module.exports = { createServer };
