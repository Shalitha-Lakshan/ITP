import { Router } from 'express';
import { requireAuth, requireRoles } from '../middleware/auth.js';
import { takeFromInventory } from '../controllers/manufacturer.controller.js';

const router = Router();

router.post('/take', requireAuth, requireRoles('ADMIN', 'MANUFACTURER'), takeFromInventory);

export default router;

