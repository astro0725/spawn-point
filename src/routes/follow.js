// require express router and the user routes
const router = require("express").Router();
// import user model / require user model
const User = require("../models/user");
const { followUser, unfollowUser } = require("../controllers/follow");

// put route to update a users following
router.put("/addfollow", followUser);

// delete route to update when user unfollows
router.delete("/removefollow", unfollowUser);

module.exports = router;
