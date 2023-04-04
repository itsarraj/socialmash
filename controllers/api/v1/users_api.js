const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
// sign in and create a session for the user
module.exports.createSession = async function (req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || user.password != req.body.password) {
            return res.status(422).json({
                message: 'Invalid username or password',
            });
        }
        return res.status(200).json({
            message:
                'Sing in successfully , here is your token and please keep your token secret',
            data: {
                token: jwt.sign(user.toJSON(), 'secret', {
                    expiresIn: '600000',
                }),
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};
