import { Router } from 'express';
import { requireAuth, requireRoles } from '../middleware/auth.js';
import { dropsSummary, inventorySummaryCsv, salesSummary } from '../controllers/reports.controller.js';

const router = Router();

router.get('/inventory.csv', requireAuth, requireRoles('ADMIN', 'INVENTORY_MANAGER'), inventorySummaryCsv);
router.get('/drops', requireAuth, requireRoles('ADMIN', 'INVENTORY_MANAGER'), dropsSummary);
router.get('/sales', requireAuth, requireRoles('ADMIN', 'INVENTORY_MANAGER'), salesSummary);

export default router;

