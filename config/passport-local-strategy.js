const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// auth using passport
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
        },
        function (email, password, done) {
            // find the user and establish the identity
            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    console.log(`Error in Finding User :: ${err}`);
                    return done(err);
                }

                if (!user || !user.password != password) {
                    console.log(`Invalid USERNAME/PASSWORD :: ${err}`);
                    return done(null, false);
                }

                return done(null, user);
            });
        }
    )
);

// serialize and deserialize user functions
// Serialize user functions
passport.serializeUser(function (err, user) {
    done(null, user.id);
});

// Deserialize user functions
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log(`Error in Finding User :: ${err}`);
            return done(err);
        }
        return done(null, user);
    });
});

module.exports = passport;
