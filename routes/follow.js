const express = require('express');
const router = express.Router();
const followController = require('../controllers/follow');
const firebaseAuth = require('../utils/firebaseAuth');

router.post('/follow/:firebaseUserId', firebaseAuth, followController.followUser);
router.delete('/follow/:firebaseUserId', firebaseAuth, followController.unfollowUser);
router.get('/friends', firebaseAuth, followController.getFriends);

module.exports = router;