import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { createOrder, listOrders } from '../controllers/orders.controller.js';

const router = Router();

router.get('/', requireAuth, listOrders);
router.post('/', requireAuth, createOrder);

export default router;

