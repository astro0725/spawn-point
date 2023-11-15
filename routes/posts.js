const express = require('express');
const { body, validationResult } = require('express-validator');
const { Post } = require('../models');
const router = express.Router();
const { upload, createPost, deletePost } = require('../controllers/posts');

// route to create a new post
router.post(
    '/create',
    // use the 'upload' middleware to handle file uploads (images and videos)
    upload.fields([{ name: 'image', maxCount: 3 }, { name: 'video', maxCount: 1 }]),
    [
        // validate the 'body' field of the request body
        body('body').trim().isLength({ min: 1 }).withMessage('Post body is required'),
        body('body').escape(),
    ],
    // middleware to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    // route handler to create a new post
    createPost
);

// route to upload files (images and videos)
router.post('/upload', upload.array('media'), function (req, res, next) {
    // map uploaded files to their URLs
    const fileInfos = req.files.map(file => ({
        url: '/uploads/' + file.filename,
    }));

    res.json(fileInfos); // respond with the file URLs
});

// route to delete a post by ID
router.delete('/delete/:postId', deletePost);

// route to get post data and render in separate link
router.get('/:username/:postId', async (req, res) => {
    const { username, postId } = req.params;

    try {
        const post = await Post.findOne({
            where: { id: postId },
            model: User, as: 'user',
        });

        if (!post) {
            return res.status(404).send('Post not found');
        }

        const isOwner = post.username === username;
        // commented code is to replace variable if necessary
        // const isOwner = post.firebaseUserId === req.user.firebaseUserId;
        res.render('postPage', { post, isOwner });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


module.exports = router;