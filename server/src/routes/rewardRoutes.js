const express = require('express');
const { authRequired } = require('../middleware/auth');
const rewardController = require('../controllers/rewardController');

const router = express.Router();

router.get('/balance', authRequired, rewardController.balance);
router.get('/ledger', authRequired, rewardController.ledger);

module.exports = router;