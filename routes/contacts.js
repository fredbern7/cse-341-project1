const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contacts');

// Route to get all users
router.get('/', contactController.getAll);

// Route to get a single user by ID
router.get('/:id', contactController.getSingle);

module.exports = router;
