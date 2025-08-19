import { Router } from 'express';
import { requireAuth, requireRoles } from '../middleware/auth.js';
import { listFinance, recordFinance } from '../controllers/finance.controller.js';

const router = Router();

router.get('/', requireAuth, requireRoles('ADMIN'), listFinance);
router.post('/', requireAuth, requireRoles('ADMIN'), recordFinance);

export default router;

