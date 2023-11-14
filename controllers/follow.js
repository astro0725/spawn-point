const User = require("../models/user");

const followUser = async (req, res) => {
  try {
    // logic for finding user with uuid that we wanna update for following
  } catch (error) {
    res.status(500).json({ message: "Error following user", error: error });
  }
};

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
