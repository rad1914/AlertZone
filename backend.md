./src/lib/index.js
./src/lib/components/SensorsList.svelte
./src/lib/components/RealTimeList.svelte
./src/lib/components/MapPanel.svelte
./src/lib/components/IncidentPanel.svelte
./src/lib/components/DashboardHeader.svelte
./src/lib/components/TopHeader.svelte
./src/lib/components/Sidebar.svelte
./src/lib/data.js
./src/routes/+page.svelte
./src/b/server.js
./svelte.config.js
./vite.config.js
./cs.js
// @path: src/lib/index.js
<!-- @path: src/lib/components/SensorsList.svelte -->
<script>
  export let items = [];
</script>
<section class="panel list-panel sensors">
  <div class="panel-header">
    <h2>Sensors</h2>
  </div>
  <div class="sensor-list">
    {#each items as sensor}
      <div class="sensor-item">
        <div class="sensor-left">
          <span class="dot {sensor.status}"></span>
          <span class="sensor-name">{sensor.name}</span>
        </div>
        <div class="sensor-value">{sensor.value}</div>
      </div>
    {/each}
  </div>
</section>
<!-- @path: src/lib/components/RealTimeList.svelte -->
<script>
  export let items = [];
</script>
<section class="panel list-panel realtime">
  <div class="panel-header">
    <h2>REAL TIME DATA</h2>
    <span class="dots">•••</span>
  </div>
  <div class="data-list">
    {#each items as item}
      <div class="data-item {item.active ? 'active' : ''}">
        <div class="item-icon {item.active ? 'red-text' : 'orange-text'}">{item.icon}</div>
        <div class="item-content">
          <h4>{item.title}</h4>
          <p>{item.desc}</p>
        </div>
        <div class="item-arrow">›</div>
      </div>
    {/each}
  </div>
</section>
<!-- @path: src/lib/components/MapPanel.svelte -->
<script></script>
<section class="panel map-panel">
  <div class="panel-header">
    <h2>LIVE MAP</h2>
    <span class="dots">•••</span>
  </div>
  <div class="map-container">
    <div class="map-controls-top">
      <div class="zoom-controls">
        <button>+</button>
        <button>-</button>
      </div>
      <div class="map-filter">
        <span class="red-dot"></span> Fuego Activo <span class="chevron">▼</span>
      </div>
    </div>
    <div class="radar-pulse">
      <div class="ring"></div>
      <div class="ring delay-1"></div>
      <div class="ring delay-2"></div>
      <div class="core"></div>
    </div>
    <div class="map-markers">
      <div class="marker m1">🚒</div>
      <div class="marker m2">🚒</div>
      <div class="marker m3">🚒</div>
    </div>
    <div class="map-footer">
      <span class="mapbox-logo">© mapbox</span>
      <div class="map-credits">Top diaco df ECOCE Sqous | Toue ois Lécs</div>
    </div>
  </div>
</section>
<!-- @path: src/lib/components/IncidentPanel.svelte -->
<script>
  export let incidentTitle = "Fuego Activo";
  export let subtitle = "Volcán de Colima";
  export let gravedad = "Alta";
  export let recursos = "3 Unidades";
  export let eta = "5 min";
</script>
<section class="panel incident-panel">
  <h2 class="panel-title center">NUEVA INCIDENCIA</h2>
  <div class="traffic-light-container">
    <div class="traffic-light">
      <div class="light red active"></div>
      <div class="light yellow"></div>
      <div class="light green"></div>
    </div>
  </div>
  <div class="incident-details">
    <h3>{incidentTitle}</h3>
    <p class="subtitle">{subtitle}</p>
    <div class="stats-list">
      <div class="stat-row">
        <span class="stat-label">Gravedad:</span>
        <span class="stat-value red-text">{gravedad}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Recursos Desplegados:</span>
        <span class="stat-value white-text">{recursos}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Tiempo Estimado de Llegada:</span>
        <span class="stat-value white-text">{eta}</span>
      </div>
    </div>
    <button class="btn-action-red">Noeve incidenois</button>
  </div>
</section>
<!-- @path: src/lib/components/DashboardHeader.svelte -->
<script>
  export let title = `"War Room" Dashboard`;
  export let leftBtn = "Gopoal Maidientis";
  export let rightBtn = "Mes bnub to rmidados";
</script>
<div class="dashboard-header">
  <h1>{title}</h1>
  <div class="header-actions">
    <button class="btn-outline">{leftBtn}</button>
    <button class="btn-primary">{rightBtn}</button>
  </div>
</div>
<!-- @path: src/lib/components/TopHeader.svelte -->
<script>
  export let operator = "J. PÉREZ";
  export let state = "ALERTA MÁXIMA";
</script>
<header class="top-header">
  <div class="header-left">
    <span class="brand">AlertZone</span>
    <span class="divider"></span>
    <span class="header-label blue-text">WAR ROOM</span>
    <span class="header-label">OPERADOR: <span class="white-text">{operator}</span></span>
    <span class="header-label">ESTADO: <span class="red-text bold">{state}</span></span>
  </div>
  <div class="header-right">
    <button class="btn-secondary">⚙️</button>
    <button class="btn-secondary notification">🔔<span class="badge"></span></button>
    <div class="avatar"></div>
  </div>
</header>
<!-- @path: src/lib/components/Sidebar.svelte -->
<script></script>
<aside class="sidebar">
  <div class="logo-icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="#ff4747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 22h20L12 2z"/></svg>
  </div>
  <nav class="nav-icons">
    <div class="nav-item"><span class="icon">📷</span></div>
    <div class="nav-item active"><span class="icon">🎛️</span></div>
    <div class="nav-item"><span class="icon">🌲</span></div>
    <div class="nav-item"><span class="icon">🏢</span></div>
    <div class="nav-item"><span class="icon">🛠️</span></div>
    <div class="nav-item"><span class="icon">⚙️</span></div>
  </nav>
  <div class="nav-bottom">
    <div class="nav-item"><span class="icon">🚪</span></div>
  </div>
</aside>
// @path: src/lib/data.js
const API_BASE = 'http://192.168.100.10:3001/api';

export const realTimeData = fetch(`${API_BASE}/realtime`)
  .then(res => {
    if (!res.ok) throw new Error('Failed to fetch realtime data');
    return res.json();
  });

export const sensors = fetch(`${API_BASE}/sensors`)
  .then(res => {
    if (!res.ok) throw new Error('Failed to fetch sensors data');
    return res.json();
  });
<!-- @path: src/routes/+page.svelte -->
<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  import TopHeader from '$lib/components/TopHeader.svelte';
  import DashboardHeader from '$lib/components/DashboardHeader.svelte';
  import IncidentPanel from '$lib/components/IncidentPanel.svelte';
  import MapPanel from '$lib/components/MapPanel.svelte';
  import RealTimeList from '$lib/components/RealTimeList.svelte';
  import SensorsList from '$lib/components/SensorsList.svelte';
  import { realTimeData, sensors } from '$lib/data.js';
  import '$lib/styles/app.css';
  let realTime = realTimeData;
  let sensorsList = sensors;
</script>
<div class="app-container">
  <Sidebar />
  <main class="main-content">
    <TopHeader operator="J. PÉREZ" state="ALERTA MÁXIMA" />
    <DashboardHeader />
    <div class="dashboard-grid">
      <IncidentPanel />
      <MapPanel />
      <div class="right-column">
        <RealTimeList items={realTime} />
        <SensorsList items={sensorsList} />
      </div>
    </div>
  </main>
</div>
// @path: src/b/server.js
const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://192.168.100.10:5173'
}));

app.use(express.json());

const realTimeData = [
  { title: "Fuego Activo", desc: "Incomino en obeo 95 0:22..", icon: "⚠️", active: false },
  { title: "Recurses Desplegados", desc: "Incomino en obeo 93 0:22..", icon: "⚠️", active: true },
  { title: "Centie Eonssser", desc: "Incomino en obeo 95 0:28..", icon: "⚠️", active: false },
  { title: "Fuego Activo", desc: "Incomino en obeo 93 0:23..", icon: "⚠️", active: false },
  { title: "Fasgo Active", desc: "Incomino en obeo 03 0:22..", icon: "⚠️", active: false }
];

const sensors = [
  { name: "Inceming Baquitify", value: "-3 oda", status: "red" },
  { name: "Sensor Fligh", value: "-3? cem", status: "red" },
  { name: "Senoor Aoavnita.", value: "75 °C", status: "green" },
  { name: "Sensor Pralbeit", value: "", status: "green" },
  { name: "Sensor Reading:", value: "", status: "blue" }
];

app.get('/api/realtime', (req, res) => {
  res.json(realTimeData);
});

app.get('/api/sensors', (req, res) => {
  res.json(sensors);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
// @path: svelte.config.js
import adapter from '@sveltejs/adapter-auto';

const config = {
	kit: {

		adapter: adapter()
	}
};

export default config;
// @path: vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()]
});
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
  if (ext === '.svelte') return 'svelte';
  return null;
}

function buildExactPathCommentRegex(commentLine) {
  const escaped = commentLine
    .trim()
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/-->$/, '-->\\s*$');
  return new RegExp(`^\\s*${escaped}`, 'm');
}

function cleanCodeContent(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, m => m.includes('@path:') ? m : '')
    .replace(/^\s*\/\/.*$/gm, line => line.includes('@path:') ? line : '')
    .replace(/^\s*#.*$/gm, line => line.includes('@path:') ? line : '')
    .replace(/([^:"'\n])\/\/(?!.*@path:).*$/gm, (_, p) => p.trimEnd())
    .replace(/\[cite\s*:\s*\d+(?:\s*,\s*\d+)*\]/g, '')
    .replace(/\[cite(?:_start|_end)?\]/g, '')
    .replace(/\[span_\d+\]\((?:start|end)_span\)/g, '')
    .replace(/^\s*$/gm, '');
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
  if (fileType === 'xml' || fileType === 'html' || fileType === 'svelte') {
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
    content = cleanCodeContent(content);
  } else if (fileType === 'xml' || fileType === 'html') {
    content = content
      .replace(/<!--[\s\S]*?-->/g, m => m.includes('@path:') ? m : '');
  } else if (fileType === 'svelte') {
    // Remove HTML comments except @path
    content = content.replace(/<!--[\s\S]*?-->/g, m => m.includes('@path:') ? m : '');

    // Clean each <script>...</script> block using the same code-clean rules
    content = content.replace(
      /<script\b([^>]*)>([\s\S]*?)<\/script>/gi,
      (match, attrs, scriptBody) => {
        const cleaned = cleanCodeContent(scriptBody);
        return `<script${attrs}>${cleaned}</script>`;
      }
    );

    // Optionally, trim empty lines introduced
    content = content.replace(/^\s*[\r\n]/gm, '');
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
    '.js','.jsx','.cjs','.mjs','.kt','.kts','.gradle','.xml','.html','.sh', '.svelte'
  ]);

  const entries = [];

  async function walk(dir) {
    const list = await fs.readdir(dir, { withFileTypes: true });
    for (const d of list) {
      if (d.name === 'node_modules') continue;
      if (d.name === '.svelte-kit') continue;
      if (d.name === 'build') continue;
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