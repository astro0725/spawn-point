const db = require('../models');
const User = db.User;
const BlockedUser = db.BlockedUser;

// Function to block a user
async function blockUser(req, res) {
    try {
        const blockerId = req.user.firebaseUserId;
        const blockedId = req.params.firebaseUserId; 

        // Prevent self-block
        if (blockerId === blockedId) {
            return res.status(400).send("Cannot block oneself.");
        }

        // Check if both users exist
        const blocker = await User.findOne({ where: { firebaseUserId: blockerId } });
        const blocked = await User.findOne({ where: { firebaseUserId: blockedId } });

        if (!blocker || !blocked) {
            return res.status(404).send("User not found.");
        }

        // Create the block relationship
        await BlockedUser.create({ blockerId, blockedId });
        res.send('User blocked successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Function to unblock a user
async function unblockUser(req, res) {
    try {
        const blockerId = req.user.firebaseUserId;
        const blockedId = req.params.firebaseUserId;

        // Remove the block relationship
        await BlockedUser.destroy({
            where: { blockerId, blockedId }
        });

        res.send('User unblocked successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    blockUser,
    unblockUser,
};
