const express = require('express');
const router = express.Router();
const followController = require('../controllers/follow');
const firebaseAuth = require('../utils/firebaseAuth');

router.post('/:firebaseUserId', firebaseAuth, followController.followUser);
router.delete('/:firebaseUserId', firebaseAuth, followController.unfollowUser);
router.get('/connect', firebaseAuth, followController.followBack);

module.exports = router;