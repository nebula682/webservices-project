const validator = require('../helpers/validate');

const saveDriver = (req, res, next) => {
                const validationRule = {
                                firstName: 'required|string',
                                lastName: 'required|string',
                                phone: 'required|numeric',
                                licenseNumber:'required|numeric',
                                email: 'required|email',
                                experienceYears: 'required|numeric',
                                available:'required|string'
                               
                                

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
                saveDriver
};