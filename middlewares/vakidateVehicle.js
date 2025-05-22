const validator = require('../helpers/validate');

const saveVehicle = (req, res, next) => {
                const validationRule = {
                                make: 'required|string',
                                model: 'required|string',
                                year: 'required|numeric',
                                color:'required|string',
                                mileage: 'required|numeric',
                                price: 'required|numeric',
                                status:'required|string'
                               
                                

                };
validator(req.body, validationRule, {}, (err, status) => {
                if(!status) {
                                res.status(412).send({
                                                success: false,
                                                messsage: 'Validation failed',
                                                data: err
                                });
                }else {
                                next();
                }
});
};

module.exports = {
                saveVehicle
};