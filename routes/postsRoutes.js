const express = require('express');
const multer = require('multer');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user'); 

// configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

router.post('/posts', async (req, res) => {
  try {
    const userId = req.session.userId || req.user.id; // conjecture -- placeholder until i see randy's file structure
    const { title, body } = req.body;
    const imageUrl = req.files['image'] ? req.files['image'][0].path : null;
    const videoUrl = req.files['video'] ? req.files['video'][0].path : null;

    const post = await Post.create({
      title,
      body,
      imageUrl,
      videoUrl,
      userId: userId 
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;