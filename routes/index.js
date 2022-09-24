const express = require('express')
const router = express.Router()
//include the home_controller
const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);


module.exports = router