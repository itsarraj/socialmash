const Comment = require('../models/user');

module.exports.createcomment = async function (req, res) {
    try {
        await Comment.create({
            content: req.body.content, // req.body.content is forms post data
            user: req.user._id, // user id from user who is logged in or can say posting
        });

        return res.redirect('back');
    } catch (error) {
        if (error) {
            console.error(error);
            return;
        }
        return res.redirect('back');
    }
};
