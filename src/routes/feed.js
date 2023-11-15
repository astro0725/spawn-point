const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/feed', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.render('feed', { posts });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;