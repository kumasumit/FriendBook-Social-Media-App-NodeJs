//Action 1 for / route
const Post = require('../models/posts');
module.exports.home = function (req, res) {

    // 2nd step for loading post and comment both
    Post.find({})
        //find all the posts from the database
        .populate('user', 'name email')
        //populate user for each post with only name and email, not password
        .populate({
            path: 'comments',
            //populate comments array for each post
            populate: {
                //populate user inside comment for each comment inside comments array
                path: 'user'
            }
        })
        .exec(function(err, posts) {
            if(err) {
                return handleError(err);
            }
            return res.render('home', {
                title: "Home",
                posts: posts,
            })
        })
}