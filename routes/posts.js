const express = require('express');
const multer = require('multer');
const path = require('path'); // Required for path.extname
const router = express.Router();
const { createPost } = require('../controllers/posts');

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/create', upload.fields([{ name: 'image', maxCount: 3 }, { name: 'video', maxCount: 1 }]), createPost);

module.exports = router;