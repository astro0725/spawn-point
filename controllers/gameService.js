const axios = require('axios');
const { Showcase } = require('../models/gameService.js');

const RAWG_API_URL = 'https://api.rawg.io/api/games';

async function topGames(req, res) {
    try {
        const response = await axios.get(`${RAWG_API_URL}`, { params: { 
            ordering: '-rating',
            page_size: 10, 
        } });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching top games');
    }
};

// TODO: Add other methods adding games to user profile
async function searchGames(req, res) {
    try {
        const searchQuery = req.query.search; 
        if (!searchQuery) {
            return res.status(400).send({ message: 'Search query is required' });
        }

        const response = await axios.get(`${RAWG_API_URL}`, { 
            params: { 
                search: searchQuery,
                page_size: 10,
            } 
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error searching games:', error);
        res.status(500).send('Error searching games');
    }
}

module.exports = {
    topGames,
    searchGames,
};