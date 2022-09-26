const User = require('../models/users');
const Post = require('../models/posts');
//Action 1 for / route
// convert the action to async/await
module.exports.home =async function (req, res) {

 //first get posts, get users, and then return posts, users as context
 try {
    // Step 1: get posts
    //any success response of Post.find will be stored in posts
    let posts = await Post.find({})
        //find({}) this will find all the posts
        .populate('user')
        //this will popluate the user which created that post
        .populate({
            path: 'comments',
            // this will populate all the comments for that post
            populate: {
                path: 'user',
                // this will populate the user which created that comment
            },

        }).populate({
            path: 'comments',
            // this will populate all the comments for that post
            populate: {
                path: 'post',
                // this will populate the user which created that comment
            },

        })

        console.log(JSON.stringify(posts))
    // Step 2: get users
    //any success response of User.find will be stored in users
    let users = await User.find({});
    //User.find({}) will display all the users in the database
    // Step 3: return posts and users to the home view page, home.ejs page
    return res.render('home', {
        title: " FriendBook || Home",
        posts: posts,
        all_users: users
    });
}catch(err)
{
    // if there is any error in fethching posts or users,
    // the control will come to catch, the console will display the error and return
    console.log('Error', err);
    return;
}
}