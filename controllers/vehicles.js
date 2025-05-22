const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req,res) => {
  mongodb.getDatabase().db().collection('vehicles').find().toArray((err, vehicles) =>{
    if(err) {
      res.status(400).json({ message:err});

  }
  res.setHeader('Content-Type','application/json');
  res.status(200).json(vehicles);
  
});
};

const getSingle = async (req, res) => {
  const vehicleId = new ObjectId(req.params.id);
   mongodb.getDatabase().db().collection('vehicles').find({
    _id:vehicleId
   }).toArray((err, result) =>{
    if(err) {
      res.status(400).json({ message:err});

  }
  res.setHeader('Content-Type','application/json');
  res.status(200).json(result[0]);
  
});
};

const createVehicle = async (req, res) => {
                
                const vehicle = {
                                make: req.body.make,
                                model: req. body.model,
                                year: req.body.year,
                                color: req.body.color,
                                mileage: req.body.mileage,
                                price: req.body.price,
                                status:req.body.status

                };
                const response = await mongodb.getDatabase().db().collection('vehicles').insertOne( vehicle);
                if (response.acknowledged)  {
                                res.status(204).send();

                }else {
                                res.status(500).json(response.error  || 'Some error pccurred while updating the vehicle.');
                }
};




const updateVehicle = async (req, res) => {
                const vehicleId = new ObjectId(req.params.id);
                const vehicle = {
                                make: req.body.make,
                                model: req. body.model,
                                year: req.body.year,
                                color: req.body.color,
                                mileage: req.body.mileage,
                                price: req.body.price,
                                status:req.body.status

                };
                const response = await mongodb.getDatabase().db().collection('vehicles').replaceOne({_id: vehicleId}, vehicle);
                if (response.modifiedCount > 0)  {
                                res.status(204).send();

                }else {
                                res.status(500).json(response.error  || 'Some error occurred while updating the vehicle.');
                }
};

const deleteVehicle = async (req,res) => {
const vehicleId = new ObjectId(req.params.id);
const response = await mongodb.getDatabase().db().collection('vehicles').deleteOne({_id: vehicleId},);
if (response.deleteCount > 0) {
res.status(204).send();
} else {
res.status(500).json(response.error || ' Some error occurred while deleting the vehicle.')
}
};

module.exports = {
                getAll, 
                getSingle,
                createVehicle,
                updateVehicle,
                deleteVehicle,
}