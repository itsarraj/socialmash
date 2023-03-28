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

                if (!user || user.password != password) {
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
passport.serializeUser(function (user, done) {
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

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    // if the user is authenticated or signed in
    if (req.isAuthenticated()) {
        return next();
    }
    // if the user is not authenticated or not signed in
    return res.redirect('/users/sign-in');
};

// TODO: check if

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
};

module.exports = passport;
