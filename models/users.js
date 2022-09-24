const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        //this means that this field is required, this field cannot be empty
        unique: true,
        // this means that email will be unique for every user
    },
    password: {
        type: String,
        required: true
    }, name: {
        type: String,
        required: true
    }
},{
    timestamps: true
//   timestamps store the value createdAt and updatedAt
})

const User = mongoose.model('User', userSchema);
//here User is a model connected to userSchema
module.exports = User;