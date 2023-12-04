const db = require('../models');
const User = db.User;
const Follow = db.Follow;

async function followUser(req,res) {
    try {
        const followerId = req.user.firebaseUserId;
        const followingId = req.params.firebaseUserId;

        // Prevent self-follow
        if (followerId === followingId) {
            return res.status(400).send("Cannot follow oneself.");
        }

        // Find the internal IDs for both users 
        const follower = await User.findOne({ where: { firebaseUserId: followerId } });
        const following = await User.findOne({ where: { firebaseUserId: followingId } });

        if (!follower || !following) {
            return res.status(404).send("User not found.");
        }

        // Check if already following
        const existingFollow = await Follow.findOne({
            where: { followerId: follower.id, followingId: following.id }
        });

        if (existingFollow) {
            return res.status(400).send("Already following this user.");
        }

        // Create the follow relationship
        await Follow.create({ followerId: follower.id, followingId: following.id });
        res.send('Followed successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

async function unfollowUser(req, res) {
    try {
        const followerFirebaseId = req.user.firebaseUserId;
        const followingFirebaseId = req.params.firebaseUserId;

        // Find the internal IDs for both users 
        const follower = await User.findOne({ where: { firebaseUserId: followerFirebaseId } });
        const following = await User.findOne({ where: { firebaseUserId: followingFirebaseId } });

        if (!follower || !following) {
            return res.status(404).send("User not found.");
        }

        // Check if the follow relationship exists
        const existingFollow = await Follow.findOne({
            where: { followerId: follower.id, followingId: following.id }
        });

        if (!existingFollow) {
            return res.status(400).send("Follow relationship does not exist.");
        }

        // Remove the follow relationship
        await Follow.destroy({
            where: { followerId: follower.id, followingId: following.id }
        });

        res.send('Unfollowed successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

async function followBack(req, res) {
    try {
        const firebaseUserId = req.user.firebaseUserId;

        // Find the internal ID for the user
        const user = await User.findOne({ where: { firebaseUserId } });
        if (!user) {
            return res.status(404).send("User not found.");
        }

        // Find all users that the current user is following
        const following = await user.getFollowing();

        // Find all users that are following the current user
        const followers = await user.getFollowers();

        // Determine mutual friends (users who are both in following and followers)
        const mutuals = following.filter(followedUser => 
            followers.some(follower => follower.id === followedUser.id));

        res.json(mutuals);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


module.exports = {
    followUser,
    unfollowUser,
    followBack
}