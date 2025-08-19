import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export async function requireAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    const user = await User.findById(payload.userId);
    if (!user || !user.isActive) return res.status(401).json({ message: 'Unauthorized' });
    req.user = { id: user._id.toString(), role: user.role };
    next();
  } catch (err) {
    next({ status: 401, message: 'Unauthorized' });
  }
}

export function requireRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}