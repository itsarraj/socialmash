const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());

const User = require('../models/user');

module.exports.profile = function (req, res) {
    console.log(res.headers);
    // let user_id_fetched = res.cookie.user_id;
    // User.findOne({ id: req.body.id }, function (err, user) {});

    // User.findOne({ _id: { $eq: res.cookie.user_id } }, function (err, user) {
    //     console.log(_id);
    // });
    // // if ((user.id == res.cookie.user_id)) {

    // }

    //
    return res.render('user_profile', {
        title: 'User Profile',
        // email: req.body.email,
        // name: req.body.name,
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
