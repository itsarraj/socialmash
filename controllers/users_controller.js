const User = require('../models/user');

module.exports.profile = function (req, res) {
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id, function (err, user) {
            if (user) {
                return res.render('user_profile', {
                    title: 'User Profile',
                    user: user,
                });
            } else {
                // Anyone can access cookies without actually being logged in .. so send them to sign in
                return res.redirect('/users/profile');
            }
        });
    } else {
        return res.redirect('/users/sign-in');
    }
};

module.exports.signout = function (req, res) {
    res.clearCookie('user_id');
    return res.redirect('/users/sign-in');
};

//  Render the signup page
module.exports.signup = function (req, res) {
    return res.render('user_sign_up', {
        title: 'socialmash | Xsignup',
    });
};
//  Render the signin page
module.exports.signin = function (req, res) {
    return res.render('user_sign_in', {
        title: 'socialmash | Xsignin',
    });
};
// get the signup data
module.exports.create = function (req, res) {
    // TODO: Give name to each input field to get the date & process it

    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log(`Error in finding user in SignIN :: ${err}`);
            return;
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log(`Error in finding user in SignIN :: ${err}`);
                    return;
                }

                return res.redirect('/users/sign-in');
            });
        } else {
            return res.redirect('back');
        }
    });
};
// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    // find the user
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log(`Error in finding user in SignIN :: ${err}`);
            return;
        }
        // handle user found
        if (user) {
            // handle password which does not match the password
            if (user.password != req.body.password) {
                return res.redirect('back');
            }
            // handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        } else {
            // handle user not found
            return res.redirect('back');
        }
    });
    // handle password which dont match
};
