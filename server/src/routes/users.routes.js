import { Router } from 'express';
import { requireAuth, requireRoles } from '../middleware/auth.js';
import { getProfile, listUsers } from '../controllers/users.controller.js';

const router = Router();

router.get('/me', requireAuth, getProfile);
router.get('/', requireAuth, requireRoles('ADMIN'), listUsers);

export default router;

