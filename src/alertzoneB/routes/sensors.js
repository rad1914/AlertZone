// @path: routes/sensors.js
const express = require('express');
const router = express.Router();
const sensors = require('../data/sensors');

router.get('/', (req, res) => res.json(sensors));

module.exports = router;