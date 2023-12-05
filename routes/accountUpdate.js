const express = require('express');
const router = express.router();
const userAuthController = require('../controllers/userAuth');

router.post('/changeEmail', userAuthController.changeEmail);
router.post('/changePassword', userAuthController.changePassword);
router.post('/sendPasswordReset', userAuthController.sendPasswordReset);

module.exports = router;