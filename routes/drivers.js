const express = require('express');
const router = express.Router();

const driversController = require('../controllers/drivers');

router.get('/', driversController.getAll);

router.get('/:id', driversController.getSingle);

router.post('/', driversController.createDriver);

router.put('/:id', driversController.updateDriver);

router.delete('/:id', driversController.deleteDriver);


module.exports = router;