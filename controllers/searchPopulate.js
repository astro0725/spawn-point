const User = require('../models/user'); 
const Post = require('../models/post'); 
const Sequelize = require('sequelize');

const fetchRandomUsers = async (count) => {
    return await User.findAll({
        order: Sequelize.literal('rand()'),
        limit: count
    });
};

const fetchRandomPosts = async (count) => {
    return await Post.findAll({
        order: Sequelize.literal('rand()'),
        limit: count,
        include: [User]
    });
};

const searchPopulate = async () => {
    try {
        const users = await fetchRandomUsers(5);
        const posts = await fetchRandomPosts(10);
        return { users, posts };
    } catch (error) {
        console.error('Error fetching initial data:', error);
        throw error;
    }
};

module.exports = { searchPopulate };