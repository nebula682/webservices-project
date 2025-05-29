/*const { body } = require('express-validator');

exports.driverValidation = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('licenseNumber').notEmpty().withMessage('LicenseNumber is required'),
  body('phone').notEmpty().withMessage('phone is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('experienceYears').notEmpty().withMessage('experienceYears is required'),
  body('available').notEmpty().withMessage('avaialable is required')
];*/




const { body } = require('express-validator');

const driversValidation = [
  body('firstName').isString().notEmpty().withMessage('First name is required'),
  body('lastName').isString().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('licenseNumber').isString().notEmpty().withMessage('License number is required'),
  body('phone').isString().notEmpty().withMessage('Phone number is required'),
  body('experienceYears').isInt({ min: 0 }).withMessage('Experience years must be a positive integer'),
  body('available').isBoolean().withMessage('Availability must be a boolean'),
];

module.exports = { driversValidation };