const express = require('express');
const router = express.Router();
const gameService = require('../controllers/gameService');

router.get('/', gameService.topGames);
router.get('/', gameService.searchGames);
router.post('/', gameService.addGames);

module.exports = router;
