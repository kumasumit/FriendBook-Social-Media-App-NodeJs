//this is entry point for all the routes for this folder
const express = require('express')
const router = express.Router()
//include the home_controller
const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);
//any routes with /users/something will be controlled by routes/users.js file
router.use('/users', require('./users'));
//any routes with /posts/something will be controlled by routes/posts.js file
router.use('/posts', require('./posts'));
//any routes with /comments/something will be controlled by routes/posts.js file
router.use('/comments', require('./comments'));



module.exports = router