const { body } = require('express-validator');

const tripsValidation = [
  body('driverId').isMongoId().withMessage('Valid driverId is required'),
  body('vehicleId').isMongoId().withMessage('Valid vehicleId is required'),
  body('startLocation').isString().notEmpty().withMessage('Start location is required'),
  body('endLocation').isString().notEmpty().withMessage('End location is required'),
  body('startTime').isISO8601().withMessage('Start time must be a valid ISO8601 date'),
  body('endTime').isISO8601().withMessage('End time must be a valid ISO8601 date'),
  body('status').isString().notEmpty().withMessage('Status is required'),
];

module.exports = { tripsValidation };