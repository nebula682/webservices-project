const { validationResult } = require('express-validator');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  // #swagger.tags = ['trips']
  // #swagger.description = 'Get all trips'
  try {
    const result = await mongodb.getDatabase().db().collection('trips').find().toArray();

    if (result.length === 0) {
      return res.status(204).send(); // No content
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  // #swagger.tags = ['trips']
  // #swagger.description = 'Get a single trip by ID'
  try {
    const tripId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('trips').find({ _id: tripId }).toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTrip = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const trip = {
    driverId: new ObjectId(req.body.driverId),
    vehicleId: new ObjectId(req.body.vehicleId),
    startLocation: req.body.startLocation,
    endLocation: req.body.endLocation,
    startTime: new Date(req.body.startTime),
    endTime: new Date(req.body.endTime),
    status: req.body.status,
  };

  try {
    const response = await mongodb.getDatabase().db().collection('trips').insertOne(trip);
    if (response.acknowledged) {
      return res.status(201).json({ message: 'Trip created successfully' });
    } else {
      return res.status(500).json({ message: 'Failed to create trip' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateTrip = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const tripId = new ObjectId(req.params.id);
  const trip = {
    driverId: new ObjectId(req.body.driverId),
    vehicleId: new ObjectId(req.body.vehicleId),
    startLocation: req.body.startLocation,
    endLocation: req.body.endLocation,
    startTime: new Date(req.body.startTime),
    endTime: new Date(req.body.endTime),
    status: req.body.status,
  };

  try {
    const response = await mongodb.getDatabase().db().collection('trips').replaceOne({ _id: tripId }, trip);
    if (response.modifiedCount > 0) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: 'Trip not found or no changes made' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteTrip = async (req, res) => {
  try {
    const tripId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('trips').deleteOne({ _id: tripId });

    if (response.deletedCount > 0) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: 'Trip not found' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createTrip,
  updateTrip,
  deleteTrip,
};