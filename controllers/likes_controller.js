//import/require Like, Post and Comment Schema
const Like = require("../models/likes");
const Post =  require("../models/posts");
const Comment = require('../models/comments');

module.exports.toggleLike = async function(req, res){
    try{

        // likes/toggle/?id=abcdef&type=Post
        //this is how the route will lok like
        let likeable;
        //here likeable is the object on which the likes are placed
        let deleted = false;
        //deleted is a boolean to detect whether it is a like or dislike
        //whether to add the like or delete the like
        if (req.query.type == 'Post'){
            //if the like is on a Post, find the post by id and populate the likes array of the post
            likeable = await Post.findById(req.query.id).populate('likes');
            console.log(likeable);
        }else{
            //if the like is on a Comment, find the comment by id and populate the likes array of the comment
            likeable = await Comment.findById(req.query.id).populate('likes');
            console.log(likeable);
        }

        // check if a like already exists
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })

        // if a like already exists then delete it
        if (existingLike){
            //delete the like._id from likeable likes array
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;

        }else{
            // else make a new like
            //add the like._id to likeable likes array
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });
            //
            likeable.likes.push(newLike._id);
            likeable.save();

        }

        return res.json(200, {
            message: "Like Request successful!",
            data: {
                deleted: deleted
            }
        })

    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}