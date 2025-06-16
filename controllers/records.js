const { validationResult } = require('express-validator');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  // #swagger.tags = ['records']
  // #swagger.description = 'Get all records'
  try {
    const result = await mongodb.getDatabase().db().collection('records').find().toArray();

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
  // #swagger.tags = ['records']
  // #swagger.description = 'Get a single record by ID'
  try {
    const recordId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('records').find({ _id: recordId }).toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createRecord = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Customize fields according to your "records" schema
  const record = {
    title: req.body.title,
    description: req.body.description,
    date: new Date(req.body.date),
    driverId: req.body.driverId ? new ObjectId(req.body.driverId) : null,
    vehicleId: req.body.vehicleId ? new ObjectId(req.body.vehicleId) : null,
    status: req.body.status,
    notes: req.body.notes,
  };

  try {
    const response = await mongodb.getDatabase().db().collection('records').insertOne(record);
    if (response.acknowledged) {
      return res.status(201).json({ message: 'Record created successfully' });
    } else {
      return res.status(500).json({ message: 'Failed to create record' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateRecord = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const recordId = new ObjectId(req.params.id);

  const record = {
    title: req.body.title,
    description: req.body.description,
    date: new Date(req.body.date),
    driverId: req.body.driverId ? new ObjectId(req.body.driverId) : null,
    vehicleId: req.body.vehicleId ? new ObjectId(req.body.vehicleId) : null,
    status: req.body.status,
    notes: req.body.notes,
  };

  try {
    const response = await mongodb.getDatabase().db().collection('records').replaceOne({ _id: recordId }, record);
    if (response.modifiedCount > 0) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: 'Record not found or no changes made' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const recordId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('records').deleteOne({ _id: recordId });

    if (response.deletedCount > 0) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: 'Record not found' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createRecord,
  updateRecord,
  deleteRecord,
};