const express = require('express');
const router = express.Router();

const vehiclesController = require('../controllers/vehicles');

router.get('/', vehiclesController.getAll);

router.get('/:id', vehiclesController.getSingle);

module.exports = router;