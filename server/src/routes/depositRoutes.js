const express = require('express');
const { authRequired } = require('../middleware/auth');
const depositController = require('../controllers/depositController');

const router = express.Router();

router.post('/', authRequired, depositController.createDeposit);
router.get('/mine', authRequired, depositController.listMyDeposits);

module.exports = router;