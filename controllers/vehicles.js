/*const { validationResult } = require('express-validator');



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
*/



const { validationResult } = require('express-validator');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Vehicle management API
 */

/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: List of vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection('vehicles').find().toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @swagger
 * /vehicles/{id}:
 *   get:
 *     summary: Get a single vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Vehicle ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehicle data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Vehicle not found
 */
const getSingle = async (req, res) => {
  const vehicleId = new ObjectId(req.params.id);

  try {
    const result = await mongodb.getDatabase().db().collection('vehicles').find({ _id: vehicleId }).toArray();
    if (result.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    return res.status(200).json(result[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Create a new vehicle
 *     tags: [Vehicles]
 *     requestBody:
 *       description: Vehicle data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               make:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: integer
 *               color:
 *                 type: string
 *               mileage:
 *                 type: integer
 *               price:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
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
      return res.status(201).json({ message: 'Vehicle created successfully' });
    } else {
      return res.status(500).json({ message: 'Failed to create vehicle' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * @swagger
 * /vehicles/{id}:
 *   put:
 *     summary: Update an existing vehicle
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Vehicle ID
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Vehicle data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               make:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: integer
 *               color:
 *                 type: string
 *               mileage:
 *                 type: integer
 *               price:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       204:
 *         description: Vehicle updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Vehicle not found or no changes made
 *       500:
 *         description: Internal server error
 */
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
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: 'Vehicle not found or no changes made' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * @swagger
 * /vehicles/{id}:
 *   delete:
 *     summary: Delete a vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Vehicle ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Vehicle deleted successfully
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 */
const deleteVehicle = async (req, res) => {
  const vehicleId = new ObjectId(req.params.id);

  try {
    const response = await mongodb.getDatabase().db().collection('vehicles').deleteOne({ _id: vehicleId });
    if (response.deletedCount > 0) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAll, 
  getSingle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};




