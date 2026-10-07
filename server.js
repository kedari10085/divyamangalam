/**
 * Divya Mangalam — Local Development Server
 * Usage: node server.js
 * Serves static frontend files and API routes:
 *   - POST /api/pandit
 *   - POST /api/waitlist
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const panditHandler = require('./api/pandit');
const waitlistHandler = require('./api/waitlist');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.xml': 'application/xml',
  '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // API Routes
  if (pathname === '/api/pandit') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      req.body = body;
      panditHandler(req, {
        status: (code) => ({
          json: (data) => {
            res.writeHead(code, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
          },
          end: () => res.end()
        }),
        setHeader: (name, val) => res.setHeader(name, val)
      });
    });
    return;
  }

  if (pathname === '/api/waitlist') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      req.body = body;
      waitlistHandler(req, {
        status: (code) => ({
          json: (data) => {
            res.writeHead(code, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
          },
          end: () => res.end()
        }),
        setHeader: (name, val) => res.setHeader(name, val)
      });
    });
    return;
  }

  // Static File Serving
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  const ext = path.extname(filePath).toLowerCase();

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n🕉️ Divya Mangalam local server running at http://localhost:${PORT}`);
  console.log(`   - Model: ${process.env.MODEL || 'claude-sonnet-5-5'}`);
  console.log(`   - API Key Configured: ${Boolean(process.env.ANTHROPIC_API_KEY)}\n`);
});
