//Action 1 for / route
const Post = require('../models/posts');
module.exports.home = function(req, res){

    Post.find({}).populate('user', 'name email').exec(function(err, posts)
    //find({}) finds all the posts with specific filter
    {
        //here user is populated with name,email and we dont include password for safety
        if (err) return handleError(err);
        return res.render('home', {
            title:"Home",
            posts: posts
            //here posts.user contains complete details of user,
            //after populating the user with id stored in postsSchema
            //it includes only name, email and not password
        });
    })
}