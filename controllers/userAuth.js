const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail, updatePassword } = require("firebase/auth");
const bcrypt = require('bcrypt');
const db = require("../models");
const User = db.User;
const validatePassword = require("../lib/passwordValidator");

// initialize firebase authentication
const auth = getAuth();

// function to sign up a new user with email and password
async function signUpUser(email, password, username) {
    try {
        // checks password strength
        const passwordError = validatePassword(password);
        if (passwordError) {
            console.error(passwordError);
            return { error: passwordError };
        }
        // checks if a username already exists in the database
        const existingUser = await User.findOne({ where: { username: username } });
        if (existingUser) {
            console.error("Username already taken.");
            return { error: "Username already taken." };
        }
        // attempts to create a new user with provided email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // extract the user information from the user credentials
        const firebaseUser = userCredential.user;
        await User.create({ username, firebaseUserId: firebaseUser.uid });
        // log the user info
        console.log("User created in Firebase and database:", firebaseUser);
    } catch (error) {
        // logs the error using firebase error codes and messages
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during sign up:", errorCode, errorMessage);
    }
}

// function to sign in an existing user with email and password
async function signInUser(email, password) {
    try {
        // attempts to sign in an existing user with provided email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user);
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during sign in:", errorCode, errorMessage);
    }
}

// function to sign out the currently signed-in user
async function signOutUser() {
    try {
        // attempts to sign out the currently signed-in user by getting the auth object from firebase
        await signOut(auth);
        console.log("User signed out successfully.");
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during sign out:", errorCode, errorMessage);
    }
}

async function changeEmail(req, res) {
    try {
        // get the currently authenticated firebase user
        const user = getAuth().currentUser;
        const newEmail = req.body.newEmail;

        // validate that the new email is provided
        if (!newEmail) {
            return res.status(400).send({
                message: "New email cannot be empty."
            });
        }

        // ensures that the new email is not the same as the current email
        if (user.email === newEmail) {
            return res.status(400).send({
                message: "New email cannot be the same as the current email."
            });
        }

        // updates the user email in firebase authentication
        await updateEmail(user, newEmail);
        res.send({
            message: "Email updated successfully."
        });
    } catch (error) {
        console.error("Error updating email:", error);
        res.status(500).send({
            message: "Some error occurred while updating the email."
        });
    }
}

async function changePassword(req, res) {
    try {
        // get the currently authenticated firebase user
        const user = getAuth().currentUser;
        const newPassword = req.body.newPassword;

        // validate password strength
        const passwordError = validatePassword(newPassword);
        if (passwordError) {
            console.error(passwordError);
            return res.status(400).send({ error: passwordError });
        }

        // ensures a password is provided
        if (!newPassword) {
            return res.status(400).send({
                message: "New password cannot be empty."
            });
        }

        // retrieves user data from database
        const dbUser = await User.findOne({ where: { firebaseUserId: user.uid } });
        
        // checks if the new password is different from the current one
        if (bcrypt.compareSync(newPassword, dbUser.previousPasswordHash)) {
            return res.status(400).send({
                message: "New password cannot be the same as the previous password."
            });
        }

        // updates the user password in firebase authentication
        await updatePassword(user, newPassword);

        // update the stored hash of the previous password in the database
        dbUser.previousPasswordHash = bcrypt.hashSync(newPassword, 10);
        await dbUser.save();

        res.send({
            message: "Password updated successfully."
        });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).send({
            message: "Some error occurred while updating the password."
        });
    }
}

module.exports = {
    signUpUser,
    signInUser,
    signOutUser,
    changeEmail,
    changePassword
};