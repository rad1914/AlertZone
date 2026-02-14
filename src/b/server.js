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
  { title: "Fuego Activop", desc: "Incomino en obeo 95 0:22..", icon: "⚠️", active: false },
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
