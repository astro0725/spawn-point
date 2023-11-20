const User = require('../models/user'); 

/**
 * Saves or updates a user's data in the MySQL database.
 * 
 * @param {string} firebaseUserId - The user's ID from Firebase.
 * @param {string} firebaseUserName - The user's name from Firebase.
 */

async function saveUserToMySQL(firebaseUserId, firebaseUserName) {
    try {
        // Upsert (update or insert) the user data.
        // If a user with the given Firebase user ID already exists, it updates their data.
        // Otherwise, it inserts a new user with the provided ID and name.
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