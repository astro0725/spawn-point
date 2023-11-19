const express = require('express');
const router = express.Router();

// Import individual route modules
const homeRoutes = require('./home');
const postRoutes = require('./posts');

// Use the imported routes
router.use('/', homeRoutes);
router.use('/posts', postRoutes);

module.exports = router;
