const User = require("../models/user");

// route to follow a user
const followUser = async (req, res) => {
  try {
    // logic for finding user with uuid that we wanna update for following
    const { uuid } = req.params;
    const userToFollow = await User.findOne({ uuid });
    // checks if user exists
    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }
    userToFollow.followers.push(req.user.id); // followers is just conjection for now
    await userToFollow.save();

    // updates users following list, conjecture for now
    const follower = await User.findbyId(req.user.id);
    if (!follower) {
      return res.status(404).json({ message: "Follower not found" });
    }
    follower.following.push(userToFollow.id);
    await follower.save();

    res.json({ message: "Successfully followed user", user: userToFollow });
  } catch (error) {
    res.status(500).json({ message: "Error following user", error: error });
  }
};

// route to unfollow a user
const unfollowUser = async (req, res) => {
  try {
    // logic for finding user, then remove corresponding user that we wanna unfollow
  } catch (error) {
    res.status(500).json({ message: "Error unfollowing user", error: error });
  }
};

module.exports = {
  followUser,
  unfollowUser,
};
