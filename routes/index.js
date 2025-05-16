const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
                //#swagger.tag=['Hello World']
                
res.send('Hello World')});


router.use('/vehicles', require('./vehicles'));

router.use('/drivers', require('./drivers')); // 👈 New collection route



module.exports = router;




