const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.render('homepage', { posts });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;