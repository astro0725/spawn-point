const express = require('express');
const router = express.Router();
const gameService = require('../controllers/gameService');

router.get('/showcase', gameService.topGames);
router.get('/showcase', gameService.searchGames);
router.post('/showcase', gameService.addGames);

module.exports = router;
