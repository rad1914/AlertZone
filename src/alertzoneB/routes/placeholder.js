const express = require('express');
const router = express.Router();

router.get('/:w/:h', (req, res) => {
  const wRaw = parseInt(req.params.w, 10);
  const hRaw = parseInt(req.params.h, 10);
  if (Number.isNaN(wRaw) || Number.isNaN(hRaw)) return res.status(400).json({ error: 'Invalid size' });
  const w = Math.max(1, wRaw || 64);
  const h = Math.max(1, hRaw || 64);
  const bg = '#374151';
  const fg = '#ffffff';
  const size = Math.max(10, Math.floor(Math.min(w, h) / 4));
  const text = `${w}×${h}`;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">\n  <rect width="${w}" height="${h}" fill="${bg}"/>\n  <text x="50%" y="50%" fill="${fg}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" dominant-baseline="middle" text-anchor="middle">${text}</text>\n</svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

module.exports = router;