const User = require('../models/user');

module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: 'User Profile',
    });
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
    return res.redirect('/');
};
