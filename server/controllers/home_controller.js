const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    try {
        const posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                },
                populate: {
                    path: 'likes',
                },
            })
            .populate('comments')
            .populate('likes');

        const users = await User.find({});

        return res.render('home', {
            title: 'SocialMash',
            posts: posts,
            all_users: users,
        });
    } catch (error) {
        console.log(error);
    }
};

// await post.populate('user').exec();
// module.exports.actionname = function (req, res) {}

// module.exports.home = function (req, res) {
//     return res.render('FileNameHomeInView', {
//         title: 'Home',
//     });
// };
