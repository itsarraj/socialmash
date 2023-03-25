const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

// inside home_controller we created a home that was exported there and accessed here with .home ;
router.get('/', homeController.home);
router.get('/contact', homeController.contact);
router.get('/a', homeController.a);
router.get('/b', homeController.b);
router.get('/c', homeController.c);
router.get('/d', homeController.d);

module.exports = router;
