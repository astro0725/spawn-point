const User = require('../models/user'); // Adjust the path as needed

async function saveUserToMySQL(firebaseUserId, firebaseUserName) {
    try {
        await User.upsert({
        firebaseUserId: firebaseUserId,
        firebaseUserName: firebaseUserName
        });
    } catch (error) {
        console.error('Error saving user to MySQL:', error);
    }
    }

module.exports = {
    saveUserToMySQL,
};