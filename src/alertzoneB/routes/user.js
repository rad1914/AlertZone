// @path: routes/user.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ name: 'J. PÉREZ', avatar: `/api/placeholder/32/32` });
});

module.exports = router;