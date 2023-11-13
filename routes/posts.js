const express = require('express');
const router = express.Router();
const { upload, createPost } = require('../controllers/posts');

router.post('/create', upload.fields([{ name: 'image', maxCount: 3 }, { name: 'video', maxCount: 1 }]), createPost);

module.exports = router;