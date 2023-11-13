const express = require('express');
const router = express.Router();
const { upload, createPost, deletePost } = require('../controllers/posts');

router.post('/create', upload.fields([{ name: 'image', maxCount: 3 }, { name: 'video', maxCount: 1 }]), createPost);

router.delete('/delete/:id', deletePost);

module.exports = router;