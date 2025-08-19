import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { recordDrop, listDrops } from '../controllers/drops.controller.js';

const router = Router();

router.get('/', requireAuth, listDrops);
router.post('/', requireAuth, recordDrop);

export default router;

