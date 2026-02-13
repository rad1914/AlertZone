// @path: server.js
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || '*' }))
app.use(express.json())

const routes = {
  '/api/alerts': './routes/alerts',
  '/api/sensors': './routes/sensors',
  '/api/map/markers': './routes/markers',
  '/api/user': './routes/user',
  '/api/placeholder': './routes/placeholder'
}

Object.entries(routes).forEach(([path, file]) =>
  app.use(path, require(file))
)

app.use((err, req, res, next) => {
  if (!res.headersSent)
    res.status(500).json({ error: 'Internal Server Error' })
  else
    next(err)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>
  console.log(`WarRoom API running on http://localhost:${PORT}`)
)
