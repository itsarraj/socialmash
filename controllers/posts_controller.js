const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports.createpost = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content, // req.body.content is forms post data
            user: req.user._id, // user id from user who is logged in or can say posting
        });

        if (req.xhr) {
            const user = await User.findById(req.user._id).exec();
            return res.status(200).json({
                data: {
                    post: post,
                    username: user.name,
                },
                message: 'Post Created successfully',
            });
        }

        return res.redirect('back');
    } catch (error) {
        console.error(error);
    }
    return res.redirect('back');
};

module.exports.destroy = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);
        // `_id` has to be converted to string to compare , but mongoose provides a way to do this with the `id` property
        if (post.user == req.user.id) {
            await Like.deleteMany({ likeable: post, onModel: 'Post' });
            await Like.deleteMany({ _id: { $in: post.comments } });

            await Post.deleteMany({ _id: post._id });
            await Comment.deleteMany({ post: req.params.id });
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id,
                    },
                    message: 'Post deleted',
                });
            }
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
    }
    return res.redirect('back');
};
