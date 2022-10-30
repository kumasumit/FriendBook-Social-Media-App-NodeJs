//create a router for likes
const express = require("express");
const passport = require("passport");

const router = express.Router();
const friendController = require("../controllers/friend_controller");

router.post(
    "/addFriend",
    passport.checkAuthentication,
    friendController.addFriend
);

router.post(
    "/removeFriend",
    passport.checkAuthentication,
    friendController.removeFriend
);

module.exports = router;
