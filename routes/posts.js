const express = require('express');
const router = express.Router();
const firebaseAuth = require('../utils/firebaseAuth.js');
const postsController = require('../controllers/posts.js');

router.post('/', firebaseAuth, postsController.createPost);

module.exports = router;