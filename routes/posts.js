const express = require('express');
const router = express.Router();
const firebaseAuth = require('../utils/firebaseAuth.js');
const postsController = require('./posts');

router.post('/', firebaseAuth, postsController.createPost);

module.exports = router;