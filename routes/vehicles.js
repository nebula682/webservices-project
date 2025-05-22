const express = require('express');
const router = express.Router();

const vehiclesController = require('../controllers/vehicles');

const validation = require('../middleware/validate');



router.get('/', vehiclesController.getAll);

router.get('/:id', vehiclesController.getSingle);

router.post('/', validation.saveVehicle, vehiclesController.createVehicle);

router.put('/:id', validation.saveVehicle, vehiclesController.updateVehicle);

router.delete('/:id', vehiclesController.deleteVehicle);

module.exports = router;