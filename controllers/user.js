const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts');
const firebaseAuth = require('../middlewares/firebaseAuth');

// Route to get posts by a specific user
router.get('/:userId/posts', firebaseAuth, postController.getPostsByUser);

module.exports = router;
