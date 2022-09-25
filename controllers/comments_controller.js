const Comment = require('../models/comments');
const Post = require('../models/posts');

//Action 1 to create a comment
module.exports.create = function(req, res){
    //find a post by id
    Post.findById(req.body.post, function(err, post){

        if (post){
            //if post is found only then create a comment for that post
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                // req.boy.post is the hidden variable that contains the post._id for which the comment was posted
                user: req.user._id
            }, function(err, comment){
                // handle error
                //after the comment is created push that comment in form of id to comments array inside Post
                post.comments.push(comment);
                post.save();
                //save the updated post
                res.redirect('/');
                //redirect to home
            });
        }

    });
}

//Action 2 to delete a comment, if a signed-in user owns the comment
