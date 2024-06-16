const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to Project1..');
  });
router.use('/users', require('./users'));
router.use('/contacts', require('./contacts'));

module.exports = router;
