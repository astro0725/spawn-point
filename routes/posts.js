const express = require('express');
const router = express.Router();
const { upload, createPost, deletePost } = require('../controllers/posts');

router.post('/create', upload.fields([{ name: 'image', maxCount: 3 }, { name: 'video', maxCount: 1 }]), createPost);

app.post('/upload', upload.array('media'), function (req, res, next) {
    const fileInfos = req.files.map(file => ({
        url: '/uploads/' + file.filename,
    }));

    res.json(fileInfos);
});

router.delete('/delete/:id', deletePost);

module.exports = router;