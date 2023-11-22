const express = require('express');
const router = express.Router();
const { signUpUser } = require('../controllers/userAuth');

router.post('/signup', async (req, res) => {
    try {
        await signUpUser(req.body.email, req.body.password);
        res.status(200).send('User signed up successfully');
        res.redirect('/profile');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;