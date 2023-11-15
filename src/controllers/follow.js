const User = require("../models/user");

// route to follow a user
const followUser = async (req, res) => {
  try {
    const followerId = req.user.id; // if we have authentication middleware
    const followedUserId = req.params.userId;

    // checks if user is following
    const existingFollower = await Follower.findOne({
      where: {
        followerId: followerId,
        followedUserId: followedUserId,
      },
    });

    if (existingFollower) {
      return res.status(400).json({ message: "User already being followed" });
    }

    //creates a follow
    const newFollower = await Follower.create({
      followerId: followerId,
      followedUserId: followedUserId,
    });

    res
      .status(200)
      .json({ message: "Successfully followed user", dara: newFollower });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error following user", error: error });
  }
};

// route to unfollow a user
const unfollowUser = async (req, res) => {
  try {
    // logic for finding user, then remove corresponding user that we wanna unfollow
    const { uuid } = req.params;
    const userToUnfollow = await User.findOne({ where: { uuid } });
    // checks if user exists
    if (!userToUnfollow) {
      return res.status(404).json({ message: "User not found" });
    }
    // finds the follower
    const follower = await User.findByPk(req.user.id);

    if (!follower) {
      return res.status(404).json({ message: "Follower not found" });
    }

    // removes the userToUnfollow's ID from the follower's following list
    await follower.removeFollowing(userToUnfollow);

    res.json({ message: "Succcessfully unffollowed user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error unfollowing user", error: error });
  }
};

module.exports = {
  followUser,
  unfollowUser,
};
