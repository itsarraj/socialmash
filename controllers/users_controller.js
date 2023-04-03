const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = async function (req, res) {
    const user = await User.findById(req.params.id);

    return res.render('user_profile', {
        title: 'User Profile',
        profile_user: user,
    });
};

module.exports.update = async function (req, res) {
    if (req.user.id == req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            await User.findByIdAndUpdate(req.params.id, req.body);
            await User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log('Multer Error: ', err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file) {
                    //    file check starts here
                    const filePath = path.join(__dirname, '..', user.avatar);
                    console.log(filePath);
                    if (user.avatar && fs.existsSync(filePath)) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    /**
                     * This is saving the path of the uploaded
                     *  file into the avatar field in User DB
                     */
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
            });
            return res.redirect('back');
        } catch (error) {
            console.error('Error : ', error);
        }
    } else {
        return res.status(401).send('Bhag yha se');
    }
};

//  Render the signup page
module.exports.signup = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect(`/users/profile/${req.user.id}`);
    }

    return res.render('user_sign_up', {
        title: 'socialmash | Xsignup',
    });
};
//  Render the signin page
module.exports.signin = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect(`/users/profile/${req.user.id}`);
    }
    return res.render('user_sign_in', {
        title: 'socialmash | Xsignin',
    });
};

// get the signup data
module.exports.create = async function (req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (req.body.password != req.body.confirm_password) {
            return res.redirect('back');
        }

        if (!user) {
            User.create(req.body);
            console.log('user created');
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        console.log('Error to fecting siginning up page', error);
        return res.redirect('back');
    }
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    return res.redirect('/');
};

// log out the user
module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            return res.redirect('back');
        } else {
            return res.redirect('/');
        }
    });
};
