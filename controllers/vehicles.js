const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {

                const result = await mongodb.getDatabase().db().collection('vehicles').find();
                result.toArray().then((vehicles) => {
                                res.setHeader('Content-Type', 'application/json');
                                res.status(200).json(vehicles);

                });
                

}

const getSingle = async (req, res) => {
                const vehicleId = new ObjectId(req.params.id);
                const result = await mongodb.getDatabase().db().collection('vehicles').find({ _id: vehicleId});
                result.toArray().then((vehicles) => {
                                res.setHeader('Content-Type', 'application/json');
                                res.status(200).json(vehicles[0]);

                });
                
};

module.exports = {
                getAll,
                getSingle
}