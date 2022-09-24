const User = require('../models/users');
//Action 1 for /users/profile
module.exports.profile = function(req, res){
    res.render('user_profile', {title:"User-Profile"})
    //here user_profile is the user_profile.ejs page in views and title is the context with value User-Profile

}

//Action 2 for /users/sign-in
//this renders the sign in page
module.exports.signIn = function(req, res){
    res.render('user_sign_in', {title:"Sign In"})
}

//Action 3 for /users/sign-up
//this renders the sign up page
module.exports.signUp = function(req, res){
    res.render('user_sign_up', {title:"Sign Up"})
}

//Action 4 for /users/create to  create a new user
//this action handles sign_up form submission data
module.exports.create = function(req, res){

    console.log(req.body);
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