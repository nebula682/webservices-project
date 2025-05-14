const router = require('express').Router();

router.get('/', (req, res) => {res.send('Hello World')});

router.use('/vehicles', require('./vehicles'));



module.exports = router;

