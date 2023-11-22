const express = require('express');
const router = express.Router();

// Import individual route modules
const signInRoutes = require('./signIn');
const signUpRoutes = require('./signUp');
const signOutRoutes = require('./signOut');
const profileRoutes = require('./profile');
const feedRoutes = require('./feed');
const postRoutes = require('./posts');

// Use the imported routes
router.use('/signIn', signInRoutes);
router.use('/signUp', signUpRoutes);
router.use('/signOut', signOutRoutes);
router.use('/profile', profileRoutes);
router.use('/', feedRoutes);
router.use('/posts', postRoutes);

module.exports = router;
