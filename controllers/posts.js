const { Post } = require("../models");

const createPost = async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            userId: req.session.UserId // alleged placeholder
        });
        res.json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error: error });
    }
};

module.exports = {
    createPost,
};