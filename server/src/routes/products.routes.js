import { Router } from 'express';
import { requireAuth, requireRoles } from '../middleware/auth.js';
import { createProduct, listProducts } from '../controllers/products.controller.js';

const router = Router();

router.get('/', listProducts);
router.post('/', requireAuth, requireRoles('ADMIN', 'MANUFACTURER'), createProduct);

export default router;

