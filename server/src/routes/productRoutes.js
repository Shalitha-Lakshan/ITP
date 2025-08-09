const express = require('express');
const { authRequired, requireRole } = require('../middleware/auth');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.listProducts);
router.post('/', authRequired, requireRole('admin', 'manufacturer'), productController.createProduct);
router.put('/:id', authRequired, requireRole('admin', 'manufacturer'), productController.updateProduct);
router.delete('/:id', authRequired, requireRole('admin'), productController.deleteProduct);

module.exports = router;