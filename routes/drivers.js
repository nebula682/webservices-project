/*const express = require('express');
const router = express.Router();

const driversController = require('../controllers/drivers');



router.get('/', driversController.getAll);

router.get('/:id', driversController.getSingle);

router.post('/', driversController.createDriver);

router.put('/:id', driversController.updateDriver);

router.delete('/:id', driversController.deleteDriver);





module.exports = router;*/






const express = require('express');
const router = express.Router();
const driversController = require('../controllers/drivers');
const { driversValidation } = require('../validations/driversValidation');




router.get('/', driversController.getAll);
router.get('/:id', driversController.getSingle);
router.post('/', driversValidation, driversController.createDriver);
router.put('/:id', driversValidation, driversController.updateDriver);
router.delete('/:id', driversController.deleteDriver);

module.exports = router;


