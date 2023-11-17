const express = require('express');
const router = express.Router();
const { getHomeData } = require('../controllers/home'); 

router.get('/', async (req, res) => {
    try {
        const data = await getHomeData();
        res.render('homepage', data); 
    } catch (error) {
        res.status(500).send('Error occurred');
    }
});

module.exports = router;