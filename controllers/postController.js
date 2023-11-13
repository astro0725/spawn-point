// require express router and the user routes
const router = require("express").Router();
const { Post } = require("../models");

router.post('/create', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            userId: req.session.UserId
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error: error });
    }

// export router
module.exports = router;
