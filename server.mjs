import http from 'node:http';
import { readFile } from 'node:fs/promises';
const files = new Set(['index.html', 'styles.css', 'app.js', 'core.js', 'capibara.svg', 'fonts/LilitaOne-Regular.ttf']);
const types = { html: 'text/html; charset=utf-8', css: 'text/css', js: 'text/javascript', svg: 'image/svg+xml', ttf: 'font/ttf' };
http.createServer(async (req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname.slice(1) || 'index.html';
  if (!files.has(path)) { res.writeHead(404); res.end('No encontrado'); return; }
  try {
    const body = await readFile(new URL(path, import.meta.url));
    res.writeHead(200, { 'Content-Type': types[path.split('.').at(-1)], 'Cache-Control': 'no-store' });
    res.end(body);
  } catch { res.writeHead(500); res.end('No se pudo leer el archivo'); }
}).listen(4173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4173'));
