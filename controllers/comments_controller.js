const Comment = require('../models/comments');
const Post = require('../models/posts');

//Action 1 to create a comment
module.exports.create = async function (req, res) {
    try {
        //here req.body.post contains the postId
        //find a post by postId
        let post = await Post.findById(req.body.post);

        if (post) {
            //if post is found only then create a comment for that post
            let comment = await Comment.create({
                //create a comment with content, postId and userId
                //postId conatins the id of the post for which comment is created
                //userId contains the id of the user who has created that comment
                content: req.body.content,
                post: req.body.post,
                // req.boy.post is the hidden variable that contains the post._id for which the comment was posted
                user: req.user._id
                //here user contains the id of user who has created that comment
            });

            //after the comment is created push that comment in form of id to comments array inside Post Schema
            post.comments.push(comment);
            post.save();
            //save the updated post
            // Handling Ajax Requests
            // check to see if the incoming request is an xhr/ajax request
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment: comment
                        //here comment has content, postId ,userId, not the complete populated user or post details
                    },
                    message: "Comment sucessfully created"
                })
            }
            //after creating the post we return the control back to home
            return res.redirect('back');
            //redirect to home page
        }
        //if loop closed
    } catch (err) {
        //if there is any error in above process, the control will go to catch block
        // and we will log the errors in the console and return
        console.log('Error', err);
        return;
    }
}

//Action 2 to delete a comment, if a signed-in user owns the comment
//delete comments
module.exports.destroy = async function (req, res) {
    try {
        //find a comment by id passed while deleting comment
        //here we are going inside comment models and finding the comment
        //which the user clicked to delete
        let comment = await Comment.findById(req.params.id).populate('post');
        // console.log(comment);
        if (comment.user == req.user.id) {
            //if the user who posted that comment is same as the user trying to delete the comment
            let postId = comment.post.id;
            // comment.post holds the post._id of the post on which the comment is posted
            comment.remove();
            //remove/delete the comment

            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })
            //go in Posts Schema search the post by id, inside comments array of that post, pull a specific comment by id passed by user and delete it
            //this will delete the comment_id from the comments array of that particular post

            return res.redirect('back');


        }else if(comment.post.user == req.user.id){
            let postId = comment.post.id;
            // comment.post holds the post._id of the post on which the comment is posted
            comment.remove();
            //remove/delete the comment

            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })
            //go in Posts Schema search the post by id, inside comments array of that post, pull a specific comment by id passed by user and delete it
            //this will delete the comment_id from the comments array of that particular post

            return res.redirect('back');

        }else{
            //if the user trying to delete the comment is different from user who posted that comment
            //send the control back to the user
            return res.redirect('back');
        }

    } catch (err) {
        //if there is any error in above process, the control will go to catch block
        // and we will log the errors in the console and return
        console.log('Error', err);
        return;
    }
}