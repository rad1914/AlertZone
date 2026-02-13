// @path: routes/alerts.js
const express = require('express');
const router = express.Router();
const alerts = require('../data/alerts');

router.get('/', (req, res) => res.json(alerts));

module.exports = router;
