const express = require('express');
const router = express.Router();
const followController = require('../controllers/follow');

router.post('/follow/:firebaseUserId', followController.followUser);

module.exports = router;