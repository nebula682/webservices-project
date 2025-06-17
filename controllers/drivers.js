const { validationResult } = require('express-validator');


const mongodb = require('../data/database');
const ObjectId  = require('mongodb').ObjectId;













const getAll = async (req, res) => {
  // #swagger.tags = ['drivers']
  // #swagger.description = 'Get all drivers'
  
  try {
    const result = await mongodb.getDatabase().db().collection('drivers').find().toArray();

     if (result.length === 0) {
      return res.status(204).send();  // Return 204 if no content found
     }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);  // Corrected: Use `result` here, not `drivers`
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




const getSingle = async (req, res) => {
  // #swagger.tags = ['drivers']
  // #swagger.description = 'Get a single driver by ID'
  
  const driverId = new ObjectId(req.params.id);
  
  try {
    const result = await mongodb.getDatabase().db().collection('drivers').find({ _id: driverId }).toArray();
    if (result.length === 0) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);  // result[0] because `find()` returns an array
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};













const createDriver = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const driver = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    licenseNumber:req.body.licenseNumber,
    phone:req.body.phone,
    email: req.body.email,
    experienceYears: req.body.experienceYears,
    available: req.body.available,
  };

  try {
    const response = await mongodb.getDatabase().db().collection('drivers').insertOne(driver);
    if (response.acknowledged) {
      return res.status(201).json({ message: 'Driver created successfully' });
    } else {
      return res.status(500).json({ message: 'Failed to create driver' });
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ message: 'Internal server error' });
  }
};










































const updateDriver = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const driverId = new ObjectId(req.params.id);
  const driver = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    licenseNumber: req.body.licenseNumber,
    phone: req.body.phone,
    email: req.body.email,
    experienceYears: req.body.experienceYears,
    available: req.body.available,
  };

  try {
    const response = await mongodb.getDatabase().db().collection('drivers').replaceOne({ _id: driverId }, driver);
    if (response.modifiedCount > 0) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: 'Driver not found or no changes made' });
    }
  } catch (err) {
    console.error(err); // Log the error
    return res.status(500).json({ message: 'Internal server error' });
  }
};

























const deleteDriver = async (req, res) => {
  const driverId = new ObjectId(req.params.id);

  try {
    const response = await mongodb.getDatabase().db().collection('drivers').deleteOne({ _id: driverId });
    if (response.deletedCount > 0) {
      return res.status(204).send(); // No content, deletion successful
    } else {
      return res.status(404).json({ message: 'Driver not found' });
    }
  } catch (err) {
    console.error(err); // Log the error
    return res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports ={
                getAll,
                getSingle,
                
                createDriver,
                updateDriver,
                deleteDriver


};