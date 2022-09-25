const User = require('../models/users');
//Action 1 for /users/profile/:id
module.exports.profile = function(req, res){
    //here we find the user from the database by id
    User.findById(req.params.id, function(err, user){
        //here params.id is the id of the user on which you clicked
        res.render('user_profile', {
            title: "User Profile",
            profile_user: user
            //here user is user found from the database by req.params.id from the users collection in the MongoDBdatabase
        })
    })
}
//Action 5 to update profile
module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        //check if the user clicked is the same user logged-in/signed-in
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            //req.body contains name and email from the form, which the user can update
            // if the update is successfull redirect to the home page
            return res.redirect('/');

        })
    }else{
        //if logged-in user is trying to update someone's else profile, then send Unauthorized request
        return res.status(401).send('Unauthorized');
    }
}
//Action 2 for /users/sign-in
//this renders the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated())
    {
    //if user is logged in, redirect it to the profile page
    return res.redirect('/users/profile')
    }
    //if user is not signed-up, send the control to sign-in page form
    return res.render('user_sign_in', {
        title: "FriendBook | Sign In"
    })
}

//Action 3 for /users/sign-up
//this renders the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated())
    {
    //  if user is alreday signed in , send the user to the profile page
    return res.redirect('/users/profile')
    }
    //if user is not signed-up, send the control to sign-up page form
    return res.render('user_sign_up', {
        title: "FriendBook | Sign Up"
    })
}

//Action 4 for /users/create to  create a new user
//this action handles sign_up form submission data
module.exports.create = function(req, res){

    // console.log(req.body);
    // first check whether password and confirm password are equal or notEqual, if they are not equal send the user back to the sign up page
    if(req.body.password !== req.body.confirm_password){
        return res.redirect('back');
    }
    //if password and confirm_password are same, search the user corresponding to the email provided in the form/body
    User.findOne({email:req.body.email}, function(err, user){
        if(err){
            console.log('error in signing up');
            return;
        }
        if(!user){
            //if no user is found for the corresponding email
            //means no previous user is associated with that email, create and store the new user
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                }
                //after creating the user redirect the user to sign in page for the new user to sign in
                return res.redirect('sign-in');
            })
        }
        // if the user is already present send the control back to sign up page
        else{
            return res.redirect('back');
        }
    })
}

//Action 4 for /users/create-session to  create a new session for logged in user
//this action handles sign_in form submission data
module.exports.createSession = function(req, res){
    return res.redirect('/');
}
//Action 5 for /users/sign-out to destroy session for logged in user on clicking sign out button
//controller for logout for signout
module.exports.destroySession = function(req, res, next)
{

        req.logout(function(err) {
          if (err) { return next(err); }
          res.redirect('/');
        });

}