// require express router and the user routes
const express = require('express');
const { Post } = require('../models/post');
const { User } = require('../models/user');

const getFeedData = async () => {
    try {
        const posts = await Post.findAll(); 
        // TODO: Add any other data fetching logic here, e.g., user data
        return { posts };
    } catch (error) {
        console.error('Error fetching Feed data:', error);
        throw error;
    }
};

// export router
module.exports = getFeedData;
