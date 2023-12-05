const db = require('../models');
const User = db.User;
const Posts = db.Posts;

async function getFeed(req, res) {
    try {
        let feed;

        if (req.firebaseUserId) {
            // User is authenticated
            const user = await User.findOne({ where: { firebaseUserId: req.firebaseUserId } });
            if (!user) {
                return res.status(404).send({ message: "User not found." });
            }

            // Get posts from the user and the users they follow
            const following = await user.getFollowing({
                include: [{
                    model: Posts,
                    as: 'posts',
                    required: false
                }]
            });

            // Extract posts from the following users
            const followingPosts = following.flatMap(followedUser => followedUser.posts);

            // Get the user's own posts
            const userPosts = await user.getPosts();

            // Combine and sort the posts by creation date
            feed = [...followingPosts, ...userPosts].sort((a, b) => b.createdAt - a.createdAt);
        } else {
            // User is not authenticated, get all posts
            feed = await Posts.findAll({ order: [['createdAt', 'DESC']] });
        }

        res.json(feed);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching feed');
    }
}

module.exports = {
    getFeed,
};
