const express = require('express');
const router = express.Router();
const blockController = require('../controllers/block');
const firebaseAuth = require('../utils/firebaseAuth');

router.post('/:firebaseUserId', firebaseAuth, blockController.blockUser);
router.delete('/:firebaseUserId', firebaseAuth, blockController.unblockUser);


module.exports = router;