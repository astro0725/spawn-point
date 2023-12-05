const express = require('express');
const router = express.Router();
const gameService = require('../controllers/gameService');
const firebaseAuth = require('../utils/firebaseAuth');

router.get('/', firebaseAuth, gameService.topGames);
router.get('/', firebaseAuth, gameService.searchGames);
router.post('/', firebaseAuth, gameService.addGames);

module.exports = router;
