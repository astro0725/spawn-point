const express = require('express');
const router = express.Router();
const firebaseAuth = require('../utils/firebaseAuth');
const postsController = require('../controllers/posts');

router.post('/', firebaseAuth, postsController.createPost);
router.put('/:postId', firebaseAuth, postsController.editPost);
router.delete('/:postId', firebaseAuth, postsController.deletePost);

module.exports = router;