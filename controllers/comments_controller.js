const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');

module.exports.createcomment = async function (req, res) {
    try {
        // find all comments that have been created in this post
        const post = await Post.findById(req.body.post);
        // create the comment object
        if (post) {
            const comment = await Comment.create({
                content: req.body.content, // req.body.content is forms post data
                post: req.body.post, // post data
                user: req.user._id, // user id from user who is logged in or can say posting
            });
            // pushed the comment object to the post
            post.comments.push(comment); // pushed the comment object to the post , not in the db cal .save() method to save the comment in the db
            post.save(); // save the comment that was created in the database
            const user = await Comment.findOne({
                content: `${req.body.content}`,
            }).populate('user', 'name email');

            // commentsMailer.newComment(user);
            let job = queue.create('emails', user).save(function (err) {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('job enqueued', job.id);
            });
            if (req.xhr) {
                // TODO: in CommentsDB better is comment.popuate user and name so that we wont get passwords
                // const user = await User.findById(req.user._id).exec();

                return res.status(200).json({
                    data: {
                        comment: comment,
                        username: user.user.name,
                    },
                    message: 'Comment Created successfully',
                });
            }
        }

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
        const comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;
            await Comment.deleteOne({ _id: postId });
            await Post.findByIdAndUpdate(postId, {
                $pull: { comments: req.params.id },
            });
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id,
                    },
                    message: 'comment deleted',
                });
            }
            return res.redirect('back');
        }
    } catch (error) {
        console.error(error);
    }
    return res.redirect('back');
};
