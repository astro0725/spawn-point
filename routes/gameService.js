const express = require('express');
const router = express.Router();
const gameService = require('../controllers/gameService');

router.get('/showcase', gameService.topGames);

// TODO: add other game-related routes

module.exports = router;
