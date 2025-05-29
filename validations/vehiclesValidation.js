const { body } = require('express-validator');

const vehiclesValidation = [
  body('make').notEmpty().withMessage('Make is required'),
  body('model').notEmpty().withMessage('Model is required'),
  body('year').isInt({ min: 1886 }).withMessage('Valid year is required'),
  body('color').notEmpty().withMessage('Color is required'),
  body('mileage').isInt({ min: 0 }).withMessage('Mileage must be a number'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a number'),
  body('status').notEmpty().withMessage('Status is required')


];

module.exports = { vehiclesValidation };
