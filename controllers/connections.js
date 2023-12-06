// TODO: steam, playstation network, xbox, battlenet, epicgames, riot games
const db = require('../models');
const User = db.User;
const Connections = db.Connections;

async function updateConnections(req, res) {
    const { firebaseUserId, steamId, playstationId, riotId, xboxId, battleNetId, epicGamesId } = req.body;

    try {
        const userConnections = await Connections.findOne({ where: { firebaseUserId } });

        if (userConnections) {
            await userConnections.update({ steamId, playstationId, riotId, xboxId, battleNetId, epicGamesId });
        } else {
            await Connections.create({ firebaseUserId, steamId, playstationId, riotId, xboxId, battleNetId, epicGamesId });
        }

        res.status(200).send({ message: "Connections updated successfully." });
    } catch (error) {
        console.error('Error updating connections:', error);
        res.status(500).send('Error updating connections');
    }
}

function generateProfileLinks(connections) {
    const links = {};

    if (connections.steamId) {
        links.steam = `https://steamcommunity.com/id/${connections.steamId}`;
    }
    if (connections.xboxId) {
        links.xbox = `https://xboxgamertag.com/search/${connections.xboxGamertag}`;
    }
    if (connections.battleNetId) {
        links.battleNet = `https://playoverwatch.com/en-us/career/pc/${connections.battleNetTag.replace('#', '-')}`;

    // Add other platforms as needed

    return links;
}

module.exports = { 
    updateConnections,
    generateProfileLinks
};
