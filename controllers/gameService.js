const axios = require('axios');
const db = require("../models");
const User = db.User;
const Showcase = db.Showcase;

const RAWG_API_URL = 'https://api.rawg.io/api/games';

async function topGames(req, res) {
    try {
        const response = await axios.get(`${RAWG_API_URL}`, { params: { 
            ordering: '-rating',
            dates: '2023-01-01,2023-12-31',
            page_size: 10, 
        } });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching top games');
    }
};

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

async function addGames(req, res) {
    const firebaseUserId = req.firebaseUserId;
    const { gameIds } = req.body;

    if (!gameIds || gameIds.length === 0 || gameIds.length > 5) {
        return res.status(400).send({ message: "You can add up to 5 games only." });
    }

    try {
        const user = await User.findOne({ where: { firebaseUserId } });
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        const games = await Showcase.findAll({
            where: { id: gameIds }
        });

        await user.setGames(games); 

        res.status(200).send({ message: "Games added to profile successfully." });
    } catch (error) {
        console.error('Error adding games to profile:', error);
        res.status(500).send('Error adding games to profile');
    }
}

module.exports = {
    topGames,
    searchGames,
    addGames,
};