import { Router } from 'express';
import { requireAuth, requireRoles } from '../middleware/auth.js';
import { createDelivery, listDeliveries, updateDeliveryStatus } from '../controllers/deliveries.controller.js';

const router = Router();

router.get('/', requireAuth, requireRoles('ADMIN', 'INVENTORY_MANAGER', 'DELIVERY'), listDeliveries);
router.post('/', requireAuth, requireRoles('ADMIN', 'INVENTORY_MANAGER'), createDelivery);
router.patch('/:id', requireAuth, requireRoles('ADMIN', 'INVENTORY_MANAGER', 'DELIVERY'), updateDeliveryStatus);

export default router;

