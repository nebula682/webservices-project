const { validationResult } = require('express-validator');



const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

/*const getAll = (req,res) => {
  mongodb.getDatabase().db().collection('vehicles').find().toArray((err, vehicles) =>{
    if(err) {
      res.status(400).json({ message:err});

  }
  res.setHeader('Content-Type','application/json');
  res.status(200).json(vehicles);
  
});
};*/





const getAll = async (req, res) => {
  // #swagger.tags = ['vehicles']
  // #swagger.description = 'Get all vehicles'
  
  try {
    const result = await mongodb.getDatabase().db().collection('vehicles').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);  // Corrected: Use `result` here, not `drivers`
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*const getSingle = async (req, res) => {
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
};*/



const getSingle = async (req, res) => {
  // #swagger.tags = ['drivers']
  // #swagger.description = 'Get a single driver by ID'
  
  const vehicleId = new ObjectId(req.params.id);
  
  try {
    const result = await mongodb.getDatabase().db().collection('vehicles').find({ _id: vehicleId }).toArray();
    if (result.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);  // result[0] because `find()` returns an array
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createVehicle = async (req, res) => {


  const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
                
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

const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}



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





/*const mongodb = require('../data/database');
const ObjectId  = require('mongodb').ObjectId;

const getAll = async (req, res) => {
                //#swagger.tags=['contacts']
                const result = await mongodb.getDatabase().db().collection('vehicles').find();
                result.toArray().then((vehicles) => {
                                res.setHeader('Content-Type', 'application/json');
                                res.status(200).json(vehicles);

});
};

const getSingle = async (req, res) => {
                //#swagger.tags=['contacts']
                const contactId = new ObjectId(req.params.id);
                const result = await mongodb.getDatabase().db().collection('vehicles').find({ _id: contactId});
                result.toArray().then((vehicles) => {
                                res.setHeader('Content-Type', 'application/json');
                                res.status(200).json(vehicles[0]);

                });

};
const createContact = async (req, res) =>{
                //#swagger.tags=['contacts']
                
                const vehicle = {
                                firstName:req.body.firstName,
                                lastName:req.body.lastName,
                                email:req.body.email,
                                favoriteColor:req.body.favoriteColor,
                                birthday:req.body.birthday
};
const response = await mongodb.getDatabase().db().collection('vehicles').insertOne(vehicle) ;
if (response.acknowledged){
                res.status(204).json({ message: 'Vehicle created successfully' }); 

} else{
                res.status(500).json(response.error ||' Some error occurred while updating the Contact');
}
};
const updateVehicle = async (req, res) =>{
                //#swagger.tags=['contacts']
                const vehicleId = new ObjectId(req.params.id);
                const vehicle = {
                                 firstName:req.body.firstName,
                                lastName:req.body.lastName,
                                email:req.body.email,
                                favoriteColor:req.body.favoriteColor,
                                birthday:req.body.birthday
};
                                

const response = await mongodb.getDatabase().db().collection('vehicles').replaceOne({ _id: vehicleId }, vehicle);
if (response.modifiedCount > 0) {
                res.status(204).send();
                } else {
                                res.status(500).json(response.error || 'Some error occured while updating the contact.');
}
};












const deleteVehicle = async (req, res) => {
                const vehicleId = new ObjectId(req.params.id);
                const response = await mongodb.getDatabase().db().collection('vehicles').deleteOne({ _id: vehicleId},);
                if (response.deletedCount > 0) {
                                res.status(204).send();
                                } else {
                                                res.status(500).json(response.error || 'Some error occurred while deleting the Contact');
                }

}


module.exports ={
                getAll,
                getSingle,
                createContact,
                updateContact,
                deleteContact


};*/




