const express = require('express')
const router = express.Router()
//include the home_controller
const usersController = require('../controllers/users_controller');
router.get('/profile', usersController.profile);
router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);

module.exports = router