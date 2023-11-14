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

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB limit for file size
    }
}).fields([{ name: 'image', maxCount: 3 }, { name: 'video', maxCount: 1 }], (error, req, res, next) => {
    if (error) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            req.multerError = 'File size is too large!';
        } else {
            req.multerError = error.message;
        }
        next();
    } else {
        next();
    }
});

// defining post logic for creating a post
const createPost = async (req, res) => {
    try {
        const { body } = req.body;
        const imageUrl = req.files['image'] ? req.files['image'][0].path : null;
        const videoUrl = req.files['video'] ? req.files['video'][0].path : null;
        const newPost = await Post.create({
            body,
            imageUrl,
            videoUrl,
            firebaseUserId: firebaseUserId
            });
        res.json(newPost);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Validation error', error: error.message });
        } else {
            return res.status(500).json({ message: 'Error creating post', error: error.message });
        }
    }
};

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const deletedPost = await Post.destroy({
            where: {
                id: postId,
                firebaseUserId: firebaseUserId
            }
        });
        if (!deletedPost) {
            return res.status(404).json({ message: 'No post found with this id!' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    upload,
    createPost,
    deletePost,
};