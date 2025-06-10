














const swaggerUi = require('swagger-ui-express');

const swaggerfile = require('./swagger.json');
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');

const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy;
const cors = require('cors')



const port = process.env.PORT || 3000;
const app = express();

app
/*.use (bodyParser.json())
.use(session({
                secret:"secret",
                resave:false,
                saveUninitialized:true,
}))*/


app
.use(bodyParser.json())
.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production',  // true in production, false locally
    }
}))




//This is the basic express session({..}) initialization
.use(passport.initialize())
//init passport on every Route call.
.use(passport.session())
//Allow passport to use express-session





.use((req, res, next)=>{
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader(
                                'Access-Control-Allow-Headers',
                                'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
                );
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                next();
})

.use(cors({methods:['GET', 'POST', 'DELETE','UPDATE','PUT', 'PATCH']}))

//.use(({origin:'*'}))//
//.use('/', require('./routes/index.js'));//

app.use('/api-docs', swaggerUi.serve, 
swaggerUi.setup(swaggerfile));








passport.use(new GithubStrategy({
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: process.env.CALLBACK_URL
},

function(accessToken, refreshToken, profile, done){
                //User.findorCreate({github.Id}, function (err, user){
                return done(null, profile);//})
                
}
));








// Start GitHub login process
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

/* GitHub callback URL after login
app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        req.session.user = req.user;  // Save user to session
        res.redirect('/');            // Redirect to home after login
    }
);*/



app.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout(() => {
        req.session.destroy();
        res.redirect('/');
    });
});







passport.serializeUser((user,done) => {
                done(null, user);
});

passport.deserializeUser((user,done) => {
                done(null, user);
});



app.get('/', (req, res) => {
  // Use req.user to check if user is logged in
  if (req.user) {
    res.send(`Logged in as ${req.user.displayName}`);
  } else {
    res.send("Logged Out");
  }
});

const { isAuthenticated } = require('./middleware/authenticate');

/* Add this route 
app.get('/protected', isAuthenticated, (req, res) => {
  res.status(200).json({ message: 'You are authorized!', user: req.session.user });
});*/






app.get('/protected', isAuthenticated, (req, res) => {
    res.status(200).json({ message: 'You are authorized!', user: req.user });
});


//app.use('/',require('./routes'));//
app.use('/',require('./routes'));



mongodb.initDb((err) =>  {
                if (err) {console.log(err);
}
else {
app.listen(port, ()  => {console.log(`Database is listening and node Running on port ${port}`)});
}
});































































