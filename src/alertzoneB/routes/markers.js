// @path: routes/markers.js
// @path: routes/marker.js
const express = require('express');
const router = express.Router();
const markers = require('../data/markers');

router.get('/', (req, res) => res.json(markers));

module.exports = router;
