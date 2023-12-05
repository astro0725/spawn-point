// TODO: steam, playstation network, xbox, battlenet, epicgames, riot games
const OpenID = require('openid');
const db = require('../models');
const User = db.User;
const Connections = db.Connections;

const relyingParty = new OpenID.RelyingParty(
    'https://localhost:3001/steam/callback', // Callback URL
    null, // Realm (optional, specifies the part of your domain users will be returning from)
    true, // Use stateless verification
    false, // Strict mode
    [] // List of extensions to enable and include
);

async function steam(req, res) {
    try {
        relyingParty.authenticate('http://steamcommunity.com/openid', false, (error, authUrl) => {
            if (error) {
                res.status(500).send('Authentication failed: ' + error);
            } else if (!authUrl) {
                res.status(500).send('Authentication failed');
            } else {
                res.redirect(authUrl);
            }
        });
    } catch (error) {
        console.error('Steam OpenID error:', error);
        res.status(500).send('Error initiating Steam authentication');
    }
}

async function steamCallback(req, res) {
    relyingParty.verifyAssertion(req, async (error, result) => {
        if (error || !result.authenticated) {
            res.status(500).send('Authentication failed: ' + error);
        } else {
            const steamId = result.claimedIdentifier.split('/').pop();
            const firebaseUserId = req.firebaseUserId;

            try {
                const user = await User.findOne({ where: { firebaseUserId } });
                if (!user) {
                    return res.status(404).send({ message: "User not found." });
                }

                let connection = await Connections.findOne({ where: { firebaseUserId } });
                if (connection) {
                    connection.steamId = steamId;
                    await connection.save();
                } else {
                    await Connections.create({ firebaseUserId, steamId });
                }

                const steamProfileUrl = `https://steamcommunity.com/profiles/${steamId}`;

                res.send({
                    message: 'Successfully authenticated with Steam',
                    steamProfileUrl: steamProfileUrl
                });
            } catch (error) {
                console.error('Error saving Steam ID:', error);
                res.status(500).send('Error saving Steam ID');
            }
        }
    });
}

module.exports = { 
    steam,
    steamCallback
};
