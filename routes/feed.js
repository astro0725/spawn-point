const express = require('express');
const router = express.Router();
const { getFeedData } = require('../controllers/feed'); 

router.get('/', async (req, res) => {
    try {
        const data = await getFeedData();
        res.render('feed', data); 
    } catch (error) {
        res.status(500).send('Error occurred');
    }
});

module.exports = router;