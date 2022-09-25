//require the passport instance
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');
// Authentication using Passport
passport.use(new LocalStrategy(
    {
    usernameField:'email',
    //here we set email from schema to be our username value
    },
    function(email, password, done) {
      User.findOne({ email: email }
        //here we match the email entered by user with the email value in the database
        ,function (err, user) {
        if (err)
        {
            console.log('Error in finding user ===> Passport')
            return done(err);
        }
        if (!user || user.password !== password)
        {
            //if no user is found for the corresponding email
            //or the password entered by user doesn't match the password in the mongoose Schema
            console.log('Invalid Username/Password');
            return done(null, false);
            //null stands for the error and false stands for no user found
        }
        //if user is found for the particular email and passwords match, then
        return done(null, user);
        // here user is the user found and authenticated
      });
    }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    //here done is just a callback function,
    //you can call it anything else
    done(null, user.id)
})

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done)
{
  User.findById(id, function(err, user){
    if(err){
        console.log('Error in finding user ---> Passport');
        return done(err);
    }
    return done(null, user);
  })
})
//check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    //if user is signed in, then pass on the request to the next function
    if(req.isAuthenticated()){
      return next();
    }
    //if user is not signed-in, redirect the req to sign-in route
    return res.redirect('/users/sign-in');
  }

  passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
      //req.user containes the current signed in user from the seesion cookie and we are just sending this to the locals for the views
      res.locals.user = req.user;
    }
    next();
  }
//at last export the passport module
module.exports = passport;