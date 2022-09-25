const express = require('express')
const router = express.Router()
const passport = require('passport');
//include the home_controller
const usersController = require('../controllers/users_controller');
router.get('/profile', usersController.profile);
router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);

router.post('/create', usersController.create);
//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    //here local stands for passport-local strategy
    //if the authentication fails redirect the control to sign-in page
    {failureRedirect:'/users/sign-in'},
), usersController.createSession);
module.exports = router