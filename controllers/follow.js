const db = require('../models');
const User = db.User;

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
        const existingFollow = await UserFollowers.findOne({
            where: { followerId: follower.id, followingId: following.id }
        });

        if (existingFollow) {
            return res.status(400).send("Already following this user.");
        }

        // Create the follow relationship
        await UserFollowers.create({ followerId: follower.id, followingId: following.id });
        res.send('Followed successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    followUser,
}