// TODO: these are the connections i want: steam, playstation network, xbox, battlenet, epicgames, riot games, twitch, and youtube
const axios = require('axios');
const db = require('../models');
const User = db.User;
const Connections = db.Connections;

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
const REDIRECT_URI = 'http://yourapp.com/twitch/callback';

const twitch = {
};

module.exports = twitch;
