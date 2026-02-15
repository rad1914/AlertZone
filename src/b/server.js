require('dotenv').config()
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: 'http://192.168.100.10:5173', credentials: true }))
app.use(express.json())
app.use(session({ secret: 'ultra_secret_key', resave: false, saveUninitialized: false }))

const ADMIN = { username: 'admin', password: 'admin' }

const getJSON = (path) => {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf-8'))
  } catch {
    return []
  }
}

const getAlerts = () => getJSON('./alerts.json')
const getSensors = () => getJSON('./sensors.json')

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

app.get('/api/realtime', (_, res) => res.json(getAlerts()))
app.get('/api/sensors', (_, res) => res.json(getSensors()))

app.get('/api/dashboard', auth, (_, res) =>
  res.json({
    operator: "Carlos Pérez",
    state: "ALERTA MÁXIMA",
    realTime: getAlerts(),
    sensors: getSensors()
  })
)

app.get('/api/incident', (_, res) => {
  const alert = getAlerts()
    .filter(a => a.active)
    .sort((a, b) =>
      b.priority !== a.priority
        ? b.priority - a.priority
        : b.id - a.id
    )[0]

  res.json(alert || {
    id: null,
    title: "Sin Alertas",
    desc: "No hay alertas activas.",
    priority: 0,
    active: false,
    recursosDesplegados: "",
    llegadaEstimada: ""
  })
})

app.get('/api/incident/:id', (req, res) => {
  const incident = getAlerts().find(a => a.id == req.params.id)
  if (!incident) return res.status(404).json({ error: 'Not found' })
  res.json(incident)
})

app.listen(PORT)