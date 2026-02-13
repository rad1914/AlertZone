./server.js
./routes/index.js
./data/markers.js
./data/sensors.js
./data/alerts.js
./cs.js
// @path: server.js
const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors(), express.json())

;[
  '/api/alerts',
  '/api/sensors',
  '/api/map/markers',
  '/api/user',
  '/api/placeholder'
].forEach(p => app.use(p, routes))

app.use((err, _, res, next) =>
  res.headersSent ? next(err) : res.status(500).json({ error: 'Internal Server Error' })
)

app.listen(PORT, () =>
  console.log(`http://localhost:${PORT}`)
)
// @path: routes/index.js
const express = require('express');
const router = express.Router();

const markers = require('../data/markers');
const sensors = require('../data/sensors');
const alerts = require('../data/alerts');

router.get('/placeholder/:w/:h', (req, res) => {
  const wRaw = parseInt(req.params.w, 10);
  const hRaw = parseInt(req.params.h, 10);

  if (Number.isNaN(wRaw) || Number.isNaN(hRaw)) {
    return res.status(400).json({ error: 'Invalid size' });
  }

  const w = Math.max(1, wRaw || 64);
  const h = Math.max(1, hRaw || 64);
  const bg = '#374151';
  const fg = '#ffffff';
  const size = Math.max(10, Math.floor(Math.min(w, h) / 4));
  const text = `${w}×${h}`;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <text x="50%" y="50%" fill="${fg}" font-family="Arial, Helvetica, sans-serif"
        font-size="${size}" dominant-baseline="middle" text-anchor="middle">
    ${text}
  </text>
</svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

router.get('/user', (req, res) => {
  res.json({
    name: 'J. PÉREZ',
    avatar: '/api/placeholder/32/32'
  });
});

router.get('/marker', (req, res) => {
  res.json(markers);
});

router.get('/sensors', (req, res) => {
  res.json(sensors);
});

router.get('/alerts', (req, res) => {
  res.json(alerts);
});

module.exports = router;
// @path: data/markers.js
module.exports = [
  { id: 1, top: '45%', left: '55%', size: 'lg', pulse: true, label: 'Incidente 1' },
  { id: 2, top: '30%', left: '40%', size: 'sm', pulse: false, label: 'Unidad 2' },
  { id: 3, top: '60%', left: '70%', size: 'sm', pulse: false, label: 'Unidad 7' }
];
// @path: data/sensors.js
module.exports = [
  { id: 1, color: 'bg-red-500', label: 'Temperatura - Zona A', value: '102 °C' },
  { id: 2, color: 'bg-green-500', label: 'Hum. - Zona B', value: '18 %' },
  { id: 3, color: 'bg-blue-500', label: 'Viento', value: '12 km/h' }
];
// @path: data/alerts.js
module.exports = [
  { id: 1, title: 'Fuego Activo!!', subtitle: 'Awacatitop 1', type: 'danger', active: true },
  { id: 2, title: 'Recursos Desplegados', subtitle: 'Unidad 3 en camino', type: 'info', active: false },
  { id: 3, title: 'Perímetro Amenazado', subtitle: 'Evacuación parcial', type: 'warning', active: false }
];
import { promises as fs } from "fs";
import { resolve, relative, extname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const cwd = process.cwd();
const scriptRelPath = relative(cwd, __filename).replace(/\\/g, '/');

function toPosixPath(path) {
  return path.replace(/\\/g, '/');
}

function getFileType(ext) {
  ext = ext.toLowerCase();
  if (
    ext === '.js' ||
    ext === '.jsx' ||
    ext === '.cjs' ||
    ext === '.mjs' ||
    ext === '.kt' ||
    ext === '.kts' ||
    ext === '.gradle' ||
    ext === '.sh'
  ) return 'code';
  if (ext === '.xml') return 'xml';
  if (ext === '.html') return 'html';
  return null;
}

function buildExactPathCommentRegex(commentLine) {
  const escaped = commentLine
    .trim()
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/-->$/, '-->\\s*$');
  return new RegExp(`^\\s*${escaped}`, 'm');
}

async function processFile(filePath) {
  const absPath = resolve(filePath);
  const relPath = toPosixPath(relative(cwd, absPath));
  const ext = extname(filePath);
  const fileType = getFileType(ext);
  if (!fileType) return;

  let content;
  try {
    content = await fs.readFile(absPath, 'utf8');
  } catch (err) {
    console.error(`Failed to read: ${relPath}`, err);
    return;
  }

  let commentLine;
  if (fileType === 'xml' || fileType === 'html') {
    commentLine = `<!-- @path: ${relPath} -->\n`;
  } else if (ext === '.sh') {
    commentLine = `# @path: ${relPath}\n`;
  } else {
    commentLine = `// @path: ${relPath}\n`;
  }

  const pathCommentRegex = buildExactPathCommentRegex(commentLine);
  const header = content.slice(0, 500);

  if (!pathCommentRegex.test(header)) {
    if ((fileType === 'xml' || fileType === 'html') && content.startsWith('<?xml')) {
      const endDecl = content.indexOf('?>');
      if (endDecl !== -1) {
        const before = content.slice(0, endDecl + 2);
        const after = content.slice(endDecl + 2).replace(/^\r?\n/, '');
        content = `${before}\n${commentLine}${after}`;
      } else {
        content = `${commentLine}${content}`;
      }
    } else {
      content = `${commentLine}${content}`;
    }
    console.log(`Prepended @path to: ${relPath}`);
  } else {
    console.log(`Skipping (already has @path): ${relPath}`);
  }

  if (fileType === 'code') {
    content = content
      .replace(/\/\*[\s\S]*?\*\//g, m => m.includes('@path:') ? m : '')
      .replace(/^\s*\/\/.*$/gm, line => line.includes('@path:') ? line : '')
      .replace(/^\s*#.*$/gm, line => line.includes('@path:') ? line : '')
      .replace(/([^:"'\n])\/\/(?!.*@path:).*$/gm, (_, p) => p.trimEnd())
      .replace(/\[cite\s*:\s*\d+(?:\s*,\s*\d+)*\]/g, '')
      .replace(/\[cite(?:_start|_end)?\]/g, '')
      .replace(/\[span_\d+\]\((?:start|end)_span\)/g, '')
      .replace(/^\s*$/gm, '');
  } else if (fileType === 'xml' || fileType === 'html') {
    content = content
      .replace(/<!--[\s\S]*?-->/g, m => m.includes('@path:') ? m : '');
  }

  if (content.includes('[span_')) {
    console.warn(`⚠️ Unremoved spans in ${relPath}`);
  }

  content = content.replace(/\n{3,}/g, '\n\n');

  if (!content.endsWith('\n')) content += '\n';

  try {
    await fs.writeFile(absPath, content, 'utf8');
    console.log(`Cleaned: ${relPath}`);
  } catch (err) {
    console.error(`Failed to write: ${relPath}`, err);
  }
}

async function main() {
  const exts = new Set([
    '.js','.jsx','.cjs','.mjs','.kt','.kts','.gradle','.xml','.html','.sh'
  ]);

  const entries = [];

  async function walk(dir) {
    const list = await fs.readdir(dir, { withFileTypes: true });
    for (const d of list) {
      if (d.name === 'node_modules') continue;
      const full = resolve(dir, d.name);
      if (d.isDirectory()) {
        await walk(full);
      } else if (exts.has(extname(d.name))) {
        const rel = toPosixPath(relative(cwd, full));
        if (rel !== scriptRelPath) entries.push(rel);
      }
    }
  }

  await walk(cwd);

  if (!entries.length) {
    console.warn('No files found');
    return;
  }

  await Promise.allSettled(entries.map(processFile));

  console.log('All done!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});