const express = require('express');
const router = express.Router();

// Import individual route modules
const feedRoutes = require('./feed');
const postRoutes = require('./posts');

// Use the imported routes
router.use('/', feedRoutes);
router.use('/posts', postRoutes);

module.exports = router;
