const express = require('express');
const router = express.Router();
const firebaseAuth = require('../utils/firebaseAuth.js');
const postsController = require('../controllers/posts.js');

router.post('/', firebaseAuth, postsController.createPost);
router.put('/:postId', firebaseAuth, postsController.editPost);

module.exports = router;