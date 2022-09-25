const Post = require('../models/posts');

//Action 1 to create a Post by a signed-in user
module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
     //here we dont store the complete user but only the id, since id is unique for every user, and can be used to populate the entire user at a later stage
     //here in id we are storing the id of the user who is creating the post
    }, function (err, post) {
        if (err) {
            console.log('error in creating a post');
            return;
        }
        return res.redirect('back');
    })
}