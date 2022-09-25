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
    }
},{
    timestamps: true
    // we have used timestamps to store createdAt and updatedAt
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;