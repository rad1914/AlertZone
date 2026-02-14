require('dotenv').config()
const app = require('express')()
const cors = require('cors')

app.use(cors())
app.use(require('express').json())

const alerts = [
  { id: 2, title: "Awacatitop Enojado", desc: "Incendio en obeo 95 0:22..", icon: "⭕", active: true },
  { id: 1, title: "Awacatitop Activo", desc: "Incendio en obeo 95 0:22..", icon: "⚠️", active: false },
]

const sensors = [
  { id: 1, name: "Temperatura del sensor", value: 45, unit: "°C", status: "green" }
]

app.get('/api/realtime', (_, r) => r.json(alerts))
app.get('/api/sensors', (_, r) => r.json(sensors))

app.listen(process.env.PORT || 3001)