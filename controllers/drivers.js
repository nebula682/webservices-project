const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req,res) => {
  mongodb.getDatabase().db().collection('drivers').find().toArray((err, drivers) =>{
    if(err) {
      res.status(400).json({ message:err});

  }
  res.setHeader('Content-Type','application/json');
  res.status(200).json(drivers);
  
});
};

const getSingle = async (req, res) => {
  const driverId = new ObjectId(req.params.id);
   mongodb.getDatabase().db().collection('drivers').find({
    _id:driverId
   }).toArray((err, result) =>{
    if(err) {
      res.status(400).json({ message:err});

  }
  res.setHeader('Content-Type','application/json');
  res.status(200).json(result[0]);
  
});
};
  


const createDriver = async (req, res) => {
                
                const driver = {
                                 firstName: req.body.firstName,
                                lastName: req. body.lastName,
                                licenseNumber: req.body.licenseNumber,
                                phone: req.body.phone,
                                email: req.body.email,
                                experienceYears: req.body.experienceYears,
                                available:req.body.available

                };
                const response = await mongodb.getDatabase().db().collection('drivers').insertOne( driver);
                if (response.acknowledged)  {
                                res.status(204).send();

                }else {
                                res.status(500).json(response.error  || 'Some error pccurred while updating the driver.');
                }
};




const updateDriver = async (req, res) => {
                const driverId = new ObjectId(req.params.id);
                const driver = {
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                licenseNumber: req.body.licenseNumber,
                                phone: req.body.phone,
                                email: req.body.email,
                                experienceYears: req.body.experienceYears,
                                available:req.body.available

                };
                const response = await mongodb.getDatabase().db().collection('drivers').replaceOne({_id: driverId}, driver);
                if (response.modifiedCount > 0)  {
                                res.status(204).send();

                }else {
                                res.status(500).json(response.error  || 'Some error occurred while updating the driver.');
                }
};

const deleteDriver = async (req,res) => {
const driverId = new ObjectId(req.params.id);
const response = await mongodb.getDatabase().db().collection('drivers').deleteOne({_id: driverId}, );
if (response.deleteCount > 0) {
res.status(204).send();
} else {
res.status(500).json(response.error || ' Some error occurred while deleting the driver.')
}
};

module.exports = {
  getAll,
  getSingle,
  createDriver,
  updateDriver,
  deleteDriver,
};