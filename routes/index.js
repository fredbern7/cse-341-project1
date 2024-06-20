const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags-['Hello World']
    res.send('Welcome to Project1..');
});

router.use('/users', require('../OTHERS/unused-routes/users'));
router.use('/contacts', require('./contacts'));

module.exports = router;
