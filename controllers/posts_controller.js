const Post = require('../models/post');

module.exports.createpost = async function (req, res) {
    try {
        await Post.create({
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
