const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search');

router.get('/search', async (req, res) => {
    try {
        const searchTerm = req.query.term;
        const results = await searchController.search(searchTerm);
        res.render('searchResults', { results });
    } catch (error) {
        res.status(500).send('Error performing search');
    }
});

module.exports = router;
