const Post = require('../../../models/post');
const Comment = require('../../../models/Comment');

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
        // if (post.user == req.user.id) {
        await Post.deleteMany({ _id: post._id });
        await Comment.deleteMany({ post: req.params.id });

        return res.json(200, {
            message: 'Post and associated  comments were deleted successfully',
        });
    } catch (error) {
        console.log(error);
        return res.json(200, {
            message: 'Internal Server Error',
        });
    }
};
