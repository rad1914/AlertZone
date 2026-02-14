// @path: src/b/server.js
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const session = require('express-session')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: 'http://192.168.100.10:5173', credentials: true }))
app.use(express.json())
app.use(session({
  secret: 'ultra_secret_key',
  resave: false,
  saveUninitialized: false
}))

const ADMIN = { username: 'admin', password: 'admin' }

const alerts = [
  { 
    id: 2, 
    title: "Qsorrallado", 
    desc: "Incendio en obeo 95 0:22..", 
    icon: "⭕", 
    active: true, 
    priority: 3,
    recursosDesplegados: "N/A",
    llegadaEstimada: "5 minutos"
  },
  { 
    id: 1, 
    title: "Awacatitop Activo", 
    desc: "Incendio en obeo 95 0:22..", 
    icon: "⚠️", 
    active: false, 
    priority: 2,
    recursosDesplegados: "1 patrulla",
    llegadaEstimada: "12 minutos"
  }
]

const sensors = [
  { id: 1, name: "Temperatura del sensor", value: 45, unit: "°C", status: "green" }
]

const auth = (req, res, next) =>
  req.session.user ? next() : res.status(401).json({ error: 'Unauthorized' })

app.post('/api/login', (req, res) => {
  const { username, password } = req.body
  if (username !== ADMIN.username || password !== ADMIN.password)
    return res.status(401).json({ ok: false })

  req.session.user = ADMIN.username
  res.json({ ok: true })
})

app.post('/api/logout', (req, res) =>
  req.session.destroy(() => res.json({ ok: true }))
)

app.get('/api/check', (req, res) =>
  res.status(req.session.user ? 200 : 401).json({ logged: !!req.session.user })
)

app.get('/api/realtime', (_, res) => res.json(alerts))
app.get('/api/sensors', (_, res) => res.json(sensors))

app.get('/api/dashboard', auth, (req, res) =>
  res.json({
    operator: "Carlos Pérez",
    state: "ALERTA MÁXIMA",
    realTime: alerts,
    sensors
  })
)

app.get('/api/incident', (_, res) =>
  res.json(
    alerts.length
      ? alerts.reduce((a, b) => b.priority > a.priority ? b : a)
      : {
          id: null,
          title: "Sin Alertas",
          desc: "No hay alertas activas.",
          priority: 0,
          active: false,
          recursosDesplegados: "",
          llegadaEstimada: ""
        }
  )
)

app.get('/api/incident/:id', (req, res) => {
  const incident = alerts.find(a => a.id == req.params.id)
  if (!incident) return res.status(404).json({ error: 'Not found' })
  res.json(incident)
})


app.listen(PORT)
