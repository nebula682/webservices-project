const { validationResult } = require('express-validator');



const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;







const getAll = async (req, res) => {
  // #swagger.tags = ['vehicles']
  // #swagger.description = 'Get all vehicles'
  
  try {
    const result = await mongodb.getDatabase().db().collection('vehicles').find().toArray();

     if (result.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);  // Corrected: Use `result` here, not `drivers`
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};











const getSingle = async (req, res) => {
  const vehicleId = new ObjectId(req.params.id);

  try {
    const result = await mongodb.getDatabase().db().collection('vehicles').find({ _id: vehicleId }).toArray();
    if (result.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found' }); // Return 404 if vehicle is not found
    }
    return res.status(200).json(result[0]); // Return the vehicle data if found
  } catch (err) {
    console.error(err); // Log the error
    return res.status(500).json({ message: err.message });
  }
};

















const createVehicle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const vehicle = {
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    color: req.body.color,
    mileage: req.body.mileage,
    price: req.body.price,
    status: req.body.status
  };

  try {
    const response = await mongodb.getDatabase().db().collection('vehicles').insertOne(vehicle);
    if (response.acknowledged) {
      return res.status(201).json({ message: 'Vehicle created successfully' }); // Use 201 for successful creation
    } else {
      return res.status(500).json({ message: 'Failed to create vehicle' });
    }
  } catch (err) {
    console.error(err); // Log the error
    return res.status(500).json({ message: 'Internal server error' });
  }
};














const updateVehicle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const vehicleId = new ObjectId(req.params.id);
  const vehicle = {
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    color: req.body.color,
    mileage: req.body.mileage,
    price: req.body.price,
    status: req.body.status
  };

  try {
    const response = await mongodb.getDatabase().db().collection('vehicles').replaceOne({ _id: vehicleId }, vehicle);
    if (response.modifiedCount > 0) {
      return res.status(204).send(); // No content on successful update
    } else {
      return res.status(404).json({ message: 'Vehicle not found or no changes made' }); // Return 404 if no vehicle was updated
    }
  } catch (err) {
    console.error(err); // Log the error
    return res.status(500).json({ message: 'Internal server error' });
  }
};














const deleteVehicle = async (req, res) => {
  const vehicleId = new ObjectId(req.params.id);

  try {
    const response = await mongodb.getDatabase().db().collection('vehicles').deleteOne({ _id: vehicleId });
    if (response.deletedCount > 0) {
      return res.status(204).send(); // No content on successful deletion
    } else {
      return res.status(404).json({ message: 'Vehicle not found' }); // Return 404 if vehicle not found
    }
  } catch (err) {
    console.error(err); // Log the error
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
                getAll, 
                getSingle,
                createVehicle,
                updateVehicle,
                deleteVehicle,
}





