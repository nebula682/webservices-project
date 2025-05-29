const { validationResult } = require('express-validator');


const mongodb = require('../data/database');
const ObjectId  = require('mongodb').ObjectId;

/*const getAll = async (req, res) => {
                
                const result = await mongodb.getDatabase().db().collection('drivers').find();
                result.toArray().then((contacts) => {
                                res.setHeader('Content-Type', 'application/json');
                                res.status(200).json(result);

});
*/











const getAll = async (req, res) => {
  // #swagger.tags = ['drivers']
  // #swagger.description = 'Get all drivers'
  
  try {
    const result = await mongodb.getDatabase().db().collection('drivers').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);  // Corrected: Use `result` here, not `drivers`
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*const getSingle = async (req, res) => {
                
                const driverId = new ObjectId(req.params.id);
                const result = await mongodb.getDatabase().db().collection('drivers').find({ _id: driverId});
                result.toArray().then((drivers) => {
                                res.setHeader('Content-Type', 'application/json');
                                res.status(200).json(drivers[0]);

                });

};*/


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



const createDriver = async (req, res) =>{
                //#swagger.tags=['contacts']

                const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
                
                const driver = {
                                firstName:req.body.firstName,
                                lastName:req.body.lastName,
                                email:req.body.email,
                                favoriteColor:req.body.favoriteColor,
                                birthday:req.body.birthday
};
const response = await mongodb.getDatabase().db().collection('drivers').insertOne(driver) ;
if (response.acknowledged){
                res.status(204).json({ message: 'Driver created successfully' }); 

} else{
                res.status(500).json(response.error ||' Some error occurred while updating the Contact');
}
};
const updateDriver = async (req, res) =>{
                //#swagger.tags=['contacts']
                const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}




                const driverId = new ObjectId(req.params.id);
                const driver = {
                                 firstName:req.body.firstName,
                                lastName:req.body.lastName,
                                licenseNumber:req.body.licenseNumber,
                                phone:req.body.phone,
                                email:req.body.email,
                                experienceYears:req.body.experienceYears,
                available:req.body.available
};
                                

const response = await mongodb.getDatabase().db().collection('drivers').replaceOne({ _id:driverId }, driver);
if (response.modifiedCount > 0) {
                res.status(204).send();
                } else {
                                res.status(500).json(response.error || 'Some error occured while updating the driver.');
}
};












const deleteDriver = async (req, res) => {
                const driverId = new ObjectId(req.params.id);
                const response = await mongodb.getDatabase().db().collection('drivers').deleteOne({ _id: driverId},);
                if (response.deletedCount > 0) {
                                res.status(204).send();
                                } else {
                                                res.status(500).json(response.error || 'Some error occurred while deleting the Driver');
                }

}


module.exports ={
                getAll,
                getSingle,
                createDriver,
                updateDriver,
                deleteDriver


};