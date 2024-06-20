const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contacts');

// Route to get all users
router.get('/', contactController.getAll);

// Route to get a single user by ID
router.get('/:id', contactController.getSingle);

// Route to create contact
router.post("/", contactController.createContact);

// Route to update contact
router.put("/:id", contactController.updateContact);

// Route to delete contact
router.delete("/:id", contactController.deleteContact);

module.exports = router;
