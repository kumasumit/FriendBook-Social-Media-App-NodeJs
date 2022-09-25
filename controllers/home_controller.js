const User = require('../models/users');
const Post = require('../models/posts');
//Action 1 for / route
module.exports.home = function (req, res) {

    // 2nd step for loading post and comment both
    Post.find({})
        //find all the posts from the database
        .populate('user', 'name email')
        //populate user for each post with only name and email, not password
        .populate({
            path: 'comments',
            //populate comments array for each post
            // this will populate all the comments for that post
            populate: {
                //populate user inside comment for each comment inside comments array
                // this will populate the user which created that comment
                path: 'user'
            }
        })
        .exec(function(err, posts) {
            if(err) {
                return handleError(err);
            }
            User.find({}, function(err, users){
                //User.find({}) will find all the users from the database
                    return res.render('home', {
                        title:" FriendBook || Home",
                        posts: posts,
                        all_users: users
                    });
            })
        })
}