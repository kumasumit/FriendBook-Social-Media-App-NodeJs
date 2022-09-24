const User = require('../models/users');
//Action 1 for /users/profile
module.exports.profile = function (req, res) {
    res.render('user_profile', { title: "User-Profile" })
    //here user_profile is the user_profile.ejs page in views and title is the context with value User-Profile

}

//Action 2 for /users/sign-in
//this renders the sign in page
module.exports.signIn = function (req, res) {
    res.render('user_sign_in', { title: "Sign In" })
}

//Action 3 for /users/sign-up
//this renders the sign up page
module.exports.signUp = function (req, res) {
    res.render('user_sign_up', { title: "Sign Up" })
}

//Action 4 for /users/create to  create a new user
//this action handles sign_up form submission data
module.exports.create = function (req, res) {

    // console.log(req.body);
    // first check whether password and confirm password are equal or notEqual, if they are not equal send the user back to the sign up page
    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
    }
    //if password and confirm_password are same, search the user corresponding to the email provided in the form/body
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('error in signing up');
            return;
        }
        if (!user) {
            //if no user is found for the corresponding email
            //means no previous user is associated with that email, create and store the new user
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('error in creating user while signing up');
                    return;
                }
                //after creating the user redirect the user to sign in page for the new user to sign in
                return res.redirect('sign-in');
            })
        }
        // if the user is already present send the control back to sign up page
        else {
            return res.redirect('back');
        }
    })
}

//Action 5 for /users/create-session to sign-in a created user
//this action handles sign_in form submission data
module.exports.createSession = function (req, res) {
    //find the user by the email
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('error in finding user in signing in');
            return;
        }
        //handle user found
        if (user) {
            //handle password which dont match with saved user password
            if (user.password !== req.body.password) {
                //return the control back to the sign in page
                return res.redirect('back');
            }
            // handle session-creation if user is found and the password entered is same as password of the user in the database
            res.cookie('user_id', user._id);
            // now redirect the user to the profile page
            return res.redirect('/users/profile');
        }
        // handle user not found redirect it to the sign-in page
        else {
            return res.redirect('back');
        }
    })
}

//Action 6 for /users/profile to display profile of a signed in user
//this action displays profile details of signed in user
module.exports.profile = function (req, res) {
    //first check if cookies present in req contains user_id
    if (req.cookies.user_id) {
        //find the user by Id
        User.findById(req.cookies.user_id, function (err, user) {
            if (user) {
                //if the user is found send the user to the profile page
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                })
                //here in context we are passing title and the complete user stored in the req.cookies
            } else {
                //if no user is found by id in req.cookies send the control back to the sign-in page
                return res.redirect('/users/sign-in');
            }
        })
    } else {
        //if there are no cookies stored in the req.cookies send the control back to the sign in page
        return res.redirect('/users/sign-in');
    }
}
//Action 6 for /users/profile to logout a signed in user
//action to logout a signed in user
module.exports.logout = function(req, res)
{
    //set the user_id stored in cookies.user_id to null
    // req.cookies.user_id = null;
    res.cookie('user_id', null);
    //on logout we set the cookie in request object to null
    //and hence all the information regarding the user is lost
    //after destroying the cookie we render the sign-in page
    return res.render('user_sign_in',{
        title: "FriendBook | Sign In"
    });
}