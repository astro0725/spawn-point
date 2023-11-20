const User = require('../models/user'); 
const Post = require('../models/post'); 
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/**
 * Handles search requests for users and posts.
 * 
 * @param {string} searchTerm - The term to search for in usernames and post content.
 * @returns {object} An object containing arrays of user and post results.
 */
async function search(searchTerm) {
    try {
        // Search for users whose usernames contain the search term
        const userResults = await User.findAll({
            where: {
                username: {
                    [Op.like]: `%${searchTerm}%`
                }
            }
        });

        // Search for posts whose content contains the search term
        const postResults = await Post.findAll({
            where: {
                content: {
                    [Op.like]: `%${searchTerm}%`
                }
            },
            include: [User] // Optional: Include user data with each post
        });

        return {
            users: userResults,
            posts: postResults
        };
    } catch (error) {
        console.error('Error in search:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

module.exports = {
    search
};
