const express = require('express');
const router = express.Router();
const passport = require('passport');
const postsController = require('../controllers/posts_controller');
const commentsController = require('../controllers/comments_controller');

router.post(
    '/create-post',
    passport.checkAuthentication,
    postsController.createpost
);

router.post(
    '/create-comment',
    passport.checkAuthentication,
    commentsController.createcomment
);

module.exports = router;
