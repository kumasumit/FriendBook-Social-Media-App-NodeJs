const express = require('express')
const router = express.Router()
const passport = require('passport');
//include the comments_controller
const commentsController = require('../controllers/comments_controller');
//we use passport.checkAuthentication to check whether user is logged-in or not, so that only logged-in user can create a post
router.post('/create', passport.checkAuthentication,
commentsController.create);
module.exports = router