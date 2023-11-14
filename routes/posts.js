const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { upload, createPost, deletePost } = require('../controllers/posts');

router.post(
    '/create',
    upload.fields([{ name: 'image', maxCount: 3 }, { name: 'video', maxCount: 1 }]),
    [
        body('body').trim().isLength({ min: 1 }).withMessage('Post body is required'),
        body('body').escape(),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    createPost
);


app.post('/upload', upload.array('media'), function (req, res, next) {
    const fileInfos = req.files.map(file => ({
        url: '/uploads/' + file.filename,
    }));

    res.json(fileInfos);
});

router.delete('/delete/:id', deletePost);

module.exports = router;