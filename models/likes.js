//Create a model for likes
const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
        //this stores the id of user who has liked the post/comment
    },
    // this defines the object id of the liked object
    //the liked object may be post/comment
    //the user may like a comment or a post
    likeable: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    // this field is used for defining the type of the liked object since this is a dynamic reference
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
        //here enum stores the different types of models like either Post or comment
    }
}, {
    timestamps: true
});


const Like = mongoose.model('Like', likeSchema);
module.exports = Like;