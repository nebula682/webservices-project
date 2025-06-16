const { body } = require('express-validator');

const recordsValidation = [
  body('tripId').isMongoId().withMessage('Valid tripId is required'),
  body('recordType').isString().notEmpty().withMessage('Record type is required'),
  body('description').isString().notEmpty().withMessage('Description is required'),
  body('date').isISO8601().withMessage('Date must be a valid ISO8601 date'),
  body('status').isString().notEmpty().withMessage('Status is required'),
  body('notes').optional().isString().withMessage('Notes must be a string'),
  body('severity').optional().isIn(['low', 'medium', 'high']).withMessage('Severity must be one of low, medium, or high'),
];

module.exports = { recordsValidation };