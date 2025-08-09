const express = require('express');
const { authRequired, requireRole } = require('../middleware/auth');
const inventoryController = require('../controllers/inventoryController');

const router = express.Router();

router.get('/summary', authRequired, requireRole('admin', 'worker', 'manufacturer'), inventoryController.summary);
router.post('/advance', authRequired, requireRole('worker', 'manufacturer', 'admin'), inventoryController.advanceStage);

module.exports = router;