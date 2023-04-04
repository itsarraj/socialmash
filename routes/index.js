const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

// inside home_controller we created a home that was exported there and accessed here with .home ;

// any requests come to '/' or anything other than user appended to it will be forwarded to the homeController
router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

// router for api routes
router.use('/api', require('./api'));

// for any further routes , access from here
// router.use('/routerName', require('./routerFile'));

module.exports = router;
