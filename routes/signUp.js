const express = require('express');
const router = express.Router();
const { signUpUser } = require('../controllers/userAuth');

// GET request to render the signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// POST request to handle the form submission
router.post('/signup', async (req, res) => {
    try {
        await signUpUser(req.body.email, req.body.password);
        res.redirect('/profile');
    } catch (error) {
        res.status(400).send(error.message);
    }
});


module.exports = router;