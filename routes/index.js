










const passport = require('passport');




const router = require('express').Router();

//router.use('/', require('./swagger'));//

router.use('/api-docs', require('./swagger')); 


/*router.get('/', (req, res) => {
                //#swagger.tag=['Hello World']
                
res.send('Hello World')});*/


router.use('/vehicles', require('./vehicles'));

router.use('/drivers', require('./drivers')); // 👈 New collection route


/*router.get('/login', passport.authenticate('github'), (req,res)=> {});//
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/logout', function(req, res, next)  {
                req.logout(function(err) {
                                if (err) { return next(err);}
                                res.redirect('/');

                });
});*/



module.exports = router;















