const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user'); 

router.post('/posts', async (req, res) => {
  try {
    const userId = req.session.userId || req.user.id; // conjecture -- placeholder until i see randy's file structure

    const post = await Post.create({
      title: req.body.title,
      body: req.body.body,
      userId: userId 
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;