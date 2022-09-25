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
//delete comments
module.exports.destroy = function(req, res)
{ //find a comment by id
  Comment.findById(req.params.id, function(err, comment)
  {
    //here we are going inside comment models and finding the comment
    //which the user clicked to delete
    if(comment.user == req.user.id){
        //if the user who posted that comment is same as the user trying to delete the comment
        let postId = comment.post;
        // comment.post holds the post._id of the post on which the comment is posted
        comment.remove();
        //remove/delete the comment
        Post.findByIdAndUpdate(postId, {$pull:{comments: req.params.id}}, function(err, post){
            return res.redirect('back');
        })
        //go in Posts Schema search the post by id, inside comments array of that post, pull a specific comment by id passed by user and delete it
        //this will delete the comment_id from the comments array of that particular post
    }else{
        //if the user trying to delete the comment is different from user who posted that comment
        //send the control back to the user
        return res.redirect('back');
    }
  })
}