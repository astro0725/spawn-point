// TODO: steam, playstation network, xbox, battlenet, epicgames, riot games, twitch, and youtube
const axios = require('axios');
const db = require('../models');
const User = db.User;
const Connections = db.Connections;

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
const REDIRECT_URI = 'localhost:';

// TODO: twitch sucks rn - come back later
// const twitch = {
//     authorize: (req, res) => {
//         const scope = 'user:read:email';
//         res.redirect(`https://id.twitch.tv/oauth2/authorize?client_id=${TWITCH_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${scope}`);
//     },

//     callback: async (req, res) => {
//         const code = req.query.code;
//         try {
//             const response = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${REDIRECT_URI}`);
//             const accessToken = response.data.access_token;
//             // Save the access token in your database associated with the user
//             // Redirect to a success page
//         } catch (error) {
//             // Redirect to an error page
//         }
//     },

//     // Additional methods to interact with Twitch API
// };

// const twitchCallback = async (req, res) => {
//     const code = req.query.code;
//     try {
//         const response = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${REDIRECT_URI}`);
//         const accessToken = response.data.access_token;

//         const firebaseUserId = req.firebaseUserId; 

//         const user = await User.findByPk(userId);
//         if (!user) {
//             throw new Error('User not found');
//         }

//         let connection = await Connections.findOne({ where: { firebaseUserId } });
//         if (!connection) {
//             connection = await Connections.create({ firebaseUserId });
//         }

//         connection.twitchAccessToken = accessToken;
//         await connection.save();

//         res.redirect('/success'); // Redirect to a success page
//     } catch (error) {
//         console.error('Error during Twitch callback:', error);
//         res.redirect('/error'); // Redirect to an error page
//     }
// };


module.exports = { 
    // twitch,
    // twitchCallback,
};
