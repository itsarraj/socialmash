const Post = require('../models/post');
const Comment = require('../models/comment');

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

module.exports.destroy = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);
        // `_id` has to be converted to string to compare , but mongoose provides a way to do this with the `id` property
        if (post.user == req.user.id) {
            await Post.deleteMany({ _id: post._id });
            await Comment.deleteMany({ post: req.params.id });
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
    }
    return res.redirect('back');
};
