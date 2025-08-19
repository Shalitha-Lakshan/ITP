import { Router } from 'express';
import { requireAuth, requireRoles } from '../middleware/auth.js';
import { addInventory, listInventory, totals } from '../controllers/inventory.controller.js';

const router = Router();

router.get('/', requireAuth, requireRoles('ADMIN', 'INVENTORY_MANAGER'), listInventory);
router.post('/', requireAuth, requireRoles('ADMIN', 'INVENTORY_MANAGER'), addInventory);
router.get('/totals', requireAuth, requireRoles('ADMIN', 'INVENTORY_MANAGER'), totals);

export default router;

