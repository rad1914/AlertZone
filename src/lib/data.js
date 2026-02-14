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