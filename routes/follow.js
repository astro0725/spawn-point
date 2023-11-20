const express = require("express");
const router = express.Router();
const firebaseAuth = require("../middlewares/firebaseAuth");
const followController = require("../controllers/follow");

// put route to update a users following
router.put("/follow", followUser);

// delete route to update when user unfollows
router.delete("/unfollow", unfollowUser);

module.exports = router;
