const express = require('express');
const router = express.Router();

// Import individual route modules
const signInRoutes = require('./signIn');
const signUpRoutes = require('./signUp');
const signOutRoutes = require('./signOut');
const accountUpdateRoutes = require('./accountUpdate');
const profileRoutes = require('./profile');
const gameServiceRoutes = require('./gameService');
const followRoutes = require('./follow');
const blockRoutes = require('./block');
const postRoutes = require('./posts');
const feedRoutes = require('./feed');

// Use the imported routes
router.use('/signin', signInRoutes);
router.use('/signup', signUpRoutes);
router.use('/signout', signOutRoutes);
router.use('/profile', profileRoutes);
router.use('/showcase', gameServiceRoutes)
router.use('/follow', followRoutes);
router.use('/block', blockRoutes);
router.use('/posts', postRoutes);
router.use('/account', accountRoutes);
router.use('/', feedRoutes);

module.exports = router;
