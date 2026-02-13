
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use('/api/alerts', require('./routes/alerts'));
app.use('/api/sensors', require('./routes/sensors'));
app.use('/api/map/markers', require('./routes/markers'));
app.use('/api/user', require('./routes/user'));
app.use('/api/placeholder', require('./routes/placeholder'));

app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`WarRoom API running on http://localhost:${PORT}`);
});