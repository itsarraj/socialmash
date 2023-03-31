const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/user');

module.exports.home = async function (req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    try {
        // const post = await Post.find({});

        // return res.render('home', {
        //     title: 'SocialMash',
        //     posts: post,
        // });

        const postss = await Post.find({}).populate('user').exec();
        // const commentss = await Comment.find({}).populate('user').exec();

        return res.render('home', {
            title: 'SocialMash',
            posts: postss,
            comments: postss.comments,
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
