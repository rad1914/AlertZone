require('dotenv').config()
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 3001

app.set('trust proxy', 1)

app.use(cors({
  origin: true,
  credentials: true
}))

app.use(express.json())

app.use(session({
  secret: 'ultra_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'none',
    secure: true
  }
}))

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
const getSubmits = () => getJSON('./submits.json')

const saveSubmits = (data) =>
  fs.writeFileSync('./submits.json', JSON.stringify(data, null, 2))

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

app.post('/api/submit', (req, res) => {
  const { title, desc, lat, lng } = req.body

  if (!title || !desc)
    return res.status(400).json({ error: 'Missing fields' })

  const submits = getSubmits()

  const newSubmit = {
    id: submits.length ? submits[submits.length - 1].id + 1 : 1,
    title,
    desc,
    lat: lat || null,
    lng: lng || null,
    createdAt: new Date().toISOString()
  }

  submits.push(newSubmit)
  saveSubmits(submits)

  res.json({ ok: true, submit: newSubmit })
})

app.get('/api/submits', (_, res) => {
  res.json(getSubmits())
})

const saveAlerts = (data) =>
  fs.writeFileSync('./alerts.json', JSON.stringify(data, null, 2))

app.post('/api/submits/:id/approve', auth, (req, res) => {
  const id = Number(req.params.id)

  const submits = getSubmits()
  const alerts = getAlerts()

  const idx = submits.findIndex(s => s.id === id)
  if (idx === -1)
    return res.status(404).json({ error: 'Submit not found' })

  const s = submits[idx]

  const newAlert = {
    id: alerts.length ? alerts[alerts.length - 1].id + 1 : 1,
    title: s.title,
    desc: s.desc,
    lat: s.lat || null,
    lng: s.lng || null,
    icon: "⚠️",
    active: true,
    priority: 1,
    recursosDesplegados: "",
    llegadaEstimada: ""
  }

  alerts.push(newAlert)
  submits.splice(idx, 1)

  saveAlerts(alerts)
  saveSubmits(submits)

  res.json({ ok: true, alert: newAlert })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log('API running on', PORT)
})
