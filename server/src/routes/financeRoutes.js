const express = require('express');
const { authRequired, requireRole } = require('../middleware/auth');
const financeController = require('../controllers/financeController');

const router = express.Router();

router.get('/transactions', authRequired, requireRole('admin'), financeController.listTransactions);
router.post('/expenses', authRequired, requireRole('admin'), financeController.recordExpense);

module.exports = router;