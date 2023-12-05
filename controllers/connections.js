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
            const firebaseUserId = req.firebaseUserId; // Assuming this is set in your middleware

            try {
                // Find the user based on firebaseUserId
                const user = await User.findOne({ where: { firebaseUserId } });
                if (!user) {
                    return res.status(404).send({ message: "User not found." });
                }

                // Find or create a connection for the user
                let connection = await Connections.findOne({ where: { firebaseUserId } });
                if (connection) {
                    // Update existing connection with new steamId
                    connection.steamId = steamId;
                    await connection.save();
                } else {
                    // Create a new connection with steamId
                    await Connections.create({ firebaseUserId, steamId });
                }

                res.send('Successfully authenticated with Steam');
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
