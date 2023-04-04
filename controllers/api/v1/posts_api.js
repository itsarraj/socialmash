const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function (req, res) {
    const posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
            },
        })
        .exec();

    return res.json(200, {
        message: 'List of posts',
        posts: posts,
    });
};

module.exports.destroy = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);
        // `_id` has to be converted to string to compare , but mongoose provides a way to do this with the `id` property
        if (post.user == req.user.id) {
            await Post.deleteMany({ _id: post._id });
            await Comment.deleteMany({ post: req.params.id });

            return res.status(200).json({
                message:
                    'Post and associated comments were deleted successfully',
            });
        } else {
            return res.status(401).json({
                message: 'You cannot delete this post',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};
