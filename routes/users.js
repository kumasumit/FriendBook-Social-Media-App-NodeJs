const express = require('express')
const router = express.Router()
//include the home_controller
const usersController = require('../controllers/users_controller');
router.get('/profile', usersController.profile);


module.exports = router