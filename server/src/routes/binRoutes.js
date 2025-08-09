const express = require('express');
const { authRequired, requireRole } = require('../middleware/auth');
const binController = require('../controllers/binController');

const router = express.Router();

router.get('/', authRequired, binController.listBins);
router.post('/', authRequired, requireRole('admin'), binController.createBin);
router.put('/:id', authRequired, requireRole('admin'), binController.updateBin);
router.delete('/:id', authRequired, requireRole('admin'), binController.deleteBin);

module.exports = router;