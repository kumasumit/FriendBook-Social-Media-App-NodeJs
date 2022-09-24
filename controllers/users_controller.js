//Action 1 for /users/profile
module.exports.profile = function(req, res){
    res.render('user_profile', {title:"User-Profile"})
    //here user_profile is the user_profile.ejs page in views and title is the context with value User-Profile

}
