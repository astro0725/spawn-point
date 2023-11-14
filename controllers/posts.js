const { Post } = require("../models");
const multer = require('multer');
const path = require('path');
const firebaseUserId = getFirebaseUserIdFromRequest(req);

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
        const { title, body } = req.body;
        const imageUrl = req.files['image'] ? req.files['image'][0].path : null;
        const videoUrl = req.files['video'] ? req.files['video'][0].path : null;
        const newPost = await Post.create({
            title,
            body,
            imageUrl,
            videoUrl,
            firebaseUserId: firebaseUserId
            });
        res.json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error: error });
    }
};

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const deletedPost = await Post.destroy({
            where: {
                id: postId,
                userId: req.user.id
            }
        });
        if (!deletedPost) {
            return res.status(404).json({ message: 'No post found with this id!' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    upload,
    createPost,
    deletePost,
};

// firebase configuration for parameters in authentication next testing
// writing functions for follow unfollow feature testing tba