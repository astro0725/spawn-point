const axios = require('axios');
const db = require("../models");
const User = db.User;
const Showcase = db.Showcase;
const RAWGGame = db.RAWGGame;

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

        const games = await Promise.all(gameIds.map(async (gameId) => {
            let game = await RAWGGame.findOne({ where: { id: gameId } });
            if (!game) {
                const response = await axios.get(`${RAWG_API_URL}/${gameId}`);
                game = await RAWGGame.create({
                    id: gameId,
                    title: response.data.name,
                    backgroundImageUrl: response.data.background_image
                });
            }
            return game;
        }));

        const showcase = await Showcase.findOne({ where: { firebaseUserId } });
        await showcase.setRAWGGames(games);

        res.status(200).send({ message: "Games added to showcase successfully." });
    } catch (error) {
        console.error('Error adding games to showcase:', error);
        res.status(500).send('Error adding games to showcase');
    }
}

async function updateGames(req, res) {
    const firebaseUserId = req.firebaseUserId;
    const { gameIds } = req.body;

    if (!gameIds) {
        return res.status(400).send({ message: "Game IDs are required for updating." });
    }

    try {
        const user = await User.findOne({ where: { firebaseUserId } });
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        const gamesToUpdate = await Promise.all(gameIds.map(async (gameId) => {
            let game = await RAWGGame.findOne({ where: { id: gameId } });
            if (!game) {
                const response = await axios.get(`${RAWG_API_URL}/${gameId}`);
                game = await RAWGGame.create({
                    id: gameId,
                    title: response.data.name,
                    backgroundImageUrl: response.data.background_image
                });
            }
            return game;
        }));

        let showcase = await Showcase.findOne({ where: { firebaseUserId } });

        await showcase.setRAWGGames(gamesToUpdate);

        res.status(200).send({ message: "Showcase updated successfully." });
    } catch (error) {
        console.error('Error updating showcase:', error);
        res.status(500).send('Error updating showcase');
    }
}

module.exports = {
    topGames,
    searchGames,
    addGames,
    updateGames,
};