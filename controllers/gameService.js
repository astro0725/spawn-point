const axios = require('axios');
const { Game } = require('../models');

const RAWG_API_URL = 'https://api.rawg.io/api/games';

async function topGames(req, res) {
  try {
    const response = await axios.get(`${RAWG_API_URL}`, { params: { /* Your params here */ } });
    // Process and return the top games data
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching top games');
  }
};

// TODO: Add other methods for searching games, adding games to user profile, etc.


module.exports = {
    topGames,
};