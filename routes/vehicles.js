/*const express = require('express');
const router = express.Router();

const vehiclesController = require('../controllers/vehicles');





router.get('/', vehiclesController.getAll);

router.get('/:id', vehiclesController.getSingle);

router.post('/', vehiclesController.createVehicle);

router.put('/:id', vehiclesController.updateVehicle);

router.delete('/:id', vehiclesController.deleteVehicle);

module.exports = router;*/






const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehicles');
const { vehiclesValidation } = require('../validations/vehiclesValidation');

const  { isAuthenticated} = require('../middleware/authenticate');



/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: Get all vehicles
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', vehiclesController.getAll);
/**
 * @swagger
 * /vehicles/{id}:
 *   get:
 *     summary: Get a single vehicle by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */

router.get('/:id', vehiclesController.getSingle);

router.post('/', vehiclesValidation, vehiclesController.createVehicle);
router.put('/:id', vehiclesValidation, vehiclesController.updateVehicle);
router.delete('/:id', vehiclesController.deleteVehicle);

router.post('/', isAuthenticated, vehiclesController.createVehicle);
router.put('/:id', isAuthenticated, vehiclesController.updateVehicle);
router.delete('/:id', isAuthenticated, vehiclesController.deleteVehicle)

module.exports = router;



