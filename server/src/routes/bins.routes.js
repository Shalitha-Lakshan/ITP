import { Router } from 'express';
import { requireAuth, requireRoles } from '../middleware/auth.js';
import { createBin, listBins } from '../controllers/bins.controller.js';

const router = Router();

router.get('/', requireAuth, listBins);
router.post('/', requireAuth, requireRoles('ADMIN'), createBin);

export default router;

