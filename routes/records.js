const express = require('express');
const router = express.Router();

const recordsController = require('../controllers/records');
const { recordsValidation } = require('../validations/recordsValidation');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', recordsController.getAll);
router.get('/:id', recordsController.getSingle);

// Protect POST, PUT, DELETE with authentication middleware and validation where needed
router.post('/', isAuthenticated, recordsValidation, recordsController.createRecord);
router.put('/:id', isAuthenticated, recordsValidation, recordsController.updateRecord);
router.delete('/:id', isAuthenticated, recordsController.deleteRecord);

module.exports = router;