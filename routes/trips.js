const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');
const { tripsValidation } = require('../validations/tripsValidation');
const { isAuthenticated } = require('../middleware/authenticate');

// Get all trips
router.get('/', tripsController.getAll);

// Get a single trip by ID
router.get('/:id', tripsController.getSingle);

// Create a new trip (protected + validation)
router.post('/', isAuthenticated, tripsValidation, tripsController.createTrip);

// Update a trip (protected + validation)
router.put('/:id', isAuthenticated, tripsValidation, tripsController.updateTrip);

// Delete a trip (protected)
router.delete('/:id', isAuthenticated, tripsController.deleteTrip);

module.exports = router;