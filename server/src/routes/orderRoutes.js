const express = require('express');
const { authRequired, requireRole } = require('../middleware/auth');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post('/', authRequired, orderController.placeOrder);
router.get('/mine', authRequired, orderController.myOrders);
router.put('/:id/status', authRequired, requireRole('admin'), orderController.updateStatus);

module.exports = router;