var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Betting = require('./app/models/bettingModel'), //created model loading here
  bodyParser = require('body-parser'),
  passport = require('passport');

var session = require('express-session')

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/bettingb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

var routes = require('./app/routes/bettingRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});



//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

require('./config/passport.js')(passport);

// app.use(passport.initialize());

app.listen(port);

console.log('betting RESTful API server started on: ' + port);

// //start google

// var passport = require('passport');
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// // Use the GoogleStrategy within Passport.
// //   Strategies in passport require a `verify` function, which accept
// //   credentials (in this case, a token, tokenSecret, and Google profile), and
// //   invoke a callback with a user object.
// passport.use(new GoogleStrategy({
//     clientID: '262564360953-cbrp16c0mmatnofuf4sftkknenvknaac.apps.googleusercontent.com',
//     clientSecret: 'BDm6MkYz9GFeB967R_W7Z1BN',
//     callbackURL: "http://localhost:3000/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     console.log('here');
//     console.log(profile)
//     var googleUserData = {
//             email: profile.emails[0],
//             name: profile.displayName,
//             googleId: profile.id
//         }
//     GoogleUser.findOrCreate({ googleId: profile.id }, function(err, user) {
//       return done(err, user);
//     });
//   }
// ));

// //end google