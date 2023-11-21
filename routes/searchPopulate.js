const express = require('express');
const router = express.Router();
const searchPopulateController = require('./controllers/searchPopulate');

router.get('/initialData', async (req, res) => {
    try {
        const data = await searchPopulateController.searchPopulate();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching initial data');
    }
});

module.exports = router;
