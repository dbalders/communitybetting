//start google

var mongoose = require('mongoose'),
    GoogleUser = mongoose.model('GoogleUser');

// var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
            clientID: '262564360953-cbrp16c0mmatnofuf4sftkknenvknaac.apps.googleusercontent.com',
            clientSecret: 'BDm6MkYz9GFeB967R_W7Z1BN',
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            var googleUserData = {
                email: profile.emails[0].value,
                name: profile.displayName,
                googleId: profile.id
            }

            GoogleUser.findOne({ googleId: profile.id }, function(error, googleUser) {
                if (!googleUser) {
                    GoogleUser.create(googleUserData, function(err, user) {
                        return done(err, user);
                    });
                } else {
                    return (error, googleUser);
                }
                console.log('here')
                response.writeHead(302, {
                    'Location': '/'
                });
                response.end();
            })

        }
    ));
}
 
//end google 