const express = require('express');
const router = express.Router();

const userController = require('../../controllers/users');

// Route to get all users
router.get('/', userController.getAll);

// Route to get a single user by ID
router.get('/:id', userController.getSingle);

module.exports = router;
