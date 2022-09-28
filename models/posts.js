const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'
        // here we are using user.id to referece the user schema
    },

     comments: [
        //include the array of ids of all comments in the post Schema itself
        //this includes the id of all comments associated with a particular post
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Comment'
        }
        //here we are referencing the Comment model by comment_id
        ,
    ],
    likes: [
        //include the array of ids of all likes in the post Schema itself
        //this includes the id of all likes associated with a particular post

        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]

},{
    timestamps: true
    // we have used timestamps to store createdAt and updatedAt
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;