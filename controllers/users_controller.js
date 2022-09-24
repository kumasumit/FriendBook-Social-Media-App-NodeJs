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