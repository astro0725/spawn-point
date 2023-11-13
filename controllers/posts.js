const { Post } = require("../models");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Set the destination for file uploads
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

    const upload = multer({ storage: storage });

// defining post logic for creating a post
const createPost = async (req, res) => {
    try {
        const userId = req.session.userId || req.user.id; // conjecture -- placeholder until i see randy's file structure
        const { title, body } = req.body;
        const imageUrl = req.files['image'] ? req.files['image'][0].path : null;
        const videoUrl = req.files['video'] ? req.files['video'][0].path : null;
        const newPost = await Post.create({
            title,
            body,
            imageUrl,
            videoUrl,
            userId: userId 
            });
        res.json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error: error });
    }
};

module.exports = {
    upload
    createPost,
};

// firebase configuration for parameters in authentication next testing
// writing functions for follow unfollow feature testing tba