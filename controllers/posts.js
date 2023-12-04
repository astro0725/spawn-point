const db = require("../models");
const User = db.User;
const Posts = db.Posts;

async function createPost(req, res) {
    try {
        const { content } = req.body;
        const firebaseUserId = req.firebaseUserId;

        if (!content) {
            return res.status(400).send({
                message: "Content cannot be empty."
            });
        }

        // Find the user to get the username
        const user = await User.findOne({ where: { firebaseUserId } });
        if (!user) {
            return res.status(404).send({
                message: "User not found."
            });
        }

        const newPost = {
            firebaseUserId: firebaseUserId,
            username: user.username,
            content: content
        };

        const post = await Posts.create(newPost);

        res.status(201).send({
            message: "Post created successfully.",
            post: post
        });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).send({
            message: "Some error occurred while creating the post."
        });
    }
};

async function editPost(req, res) {
    try {
        const postId = req.params.postId; 
        const { content } = req.body; 
        const firebaseUserId = req.firebaseUserId; 

        if (!content) {
            return res.status(400).send({
                message: "Content cannot be empty."
            });
        }

        // Find the post to be edited
        const post = await Posts.findByPk(postId);
        if (!post) {
            return res.status(404).send({
                message: "Post not found."
            });
        }

        // Check if the user making the request is the creator of the post
        if (post.firebaseUserId !== firebaseUserId) {
            return res.status(403).send({
                message: "Unauthorized to edit this post."
            });
        }

        // Update the post
        post.content = content;
        await post.save();

        res.send({
            message: "Post updated successfully.",
            post: post
        });
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).send({
            message: "Some error occurred while updating the post."
        });
    }
};

module.exports = {
    createPost,
    editPost, 
};