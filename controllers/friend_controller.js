const Friend = require("../models/friendship");
const User = require("../models/users");
//Action 1 for / route
// convert the action to async/await
module.exports.addFriend = async function (req, res) {
    //first get posts, get users, and then return posts, users as context
    try {
        const fromUserId = req.user.id;
        const toUserId = req.body.toUser;
        console.log(fromUserId);
        console.log(toUserId);

        let post = await Friend.create({
            from_user: fromUserId,
            to_user: toUserId,
            //here we dont store the complete user but only the id, since id is unique for every user, and can be used to populate the entire user at a later stage
            //here in id we are storing the id of the user who is creating the post
        });

        let friendShip = await Friend.find({
            from_user: fromUserId,
        }).populate("to_user");

        const allFriends = friendShip.map((friendShip) => {
            return friendShip.to_user.id;
        });

        const fromUser = await User.findById(fromUserId);
        const toUser = await User.findById(toUserId);

        console.log(fromUser);
        console.log(toUser);

        return res.render("user_profile", {
            title: " FriendBook || Home",
            user: fromUser,
            profile_user: toUser,
            allFriends: allFriends,
        });
    } catch (err) {
        // if there is any error in fethching posts or users,
        // the control will come to catch, the console will display the error and return
        console.log("Error", err);
        return;
    }
};

module.exports.removeFriend = async function (req, res) {
    //first get posts, get users, and then return posts, users as context
    try {
        const fromUserId = req.user._id;
        const toUserId = req.body.toUser;

        let post = await Friend.deleteOne({
            from_user: fromUserId,
            to_user: toUserId,
            //here we dont store the complete user but only the id, since id is unique for every user, and can be used to populate the entire user at a later stage
            //here in id we are storing the id of the user who is creating the post
        });

        let friendShip = await Friend.find({
            from_user: req.user._id,
        }).populate("to_user");

        const allFriends = friendShip.map((friendShip) => {
            return friendShip.to_user.id;
        });

        const fromUserObject = await User.findById(fromUserId);
        const toUserObject = await User.findById(toUserId);

        if (req.xhr) {
            console.log(fromUserObject);
            console.log(toUserObject);
            // return res.status(200).json({
            //     data: {
            //         post: post,
            //         //here post has content, comments array and only the userId, not the complete populated user
            //     },
            //     message: "Post sucessfully created",
            // });
        }

        return res.render("user_profile", {
            title: " FriendBook || Home",
            user: fromUserObject,
            profile_user: toUserObject,
            allFriends: allFriends,
        });
    } catch (err) {
        // if there is any error in fethching posts or users,
        // the control will come to catch, the console will display the error and return
        console.log("Error", err);
        return;
    }
};
