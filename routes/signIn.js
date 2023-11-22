const express = require('express');
const router = express.Router();
const { signInUser } = require('../controllers/userAuth');

router.post('/signin', async (req, res) => {
    try {
        await signInUser(req.body.email, req.body.password);
        res.status(200).send('User signed in successfully');
        res.redirect('/profile');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;