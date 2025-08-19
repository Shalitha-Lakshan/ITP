import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { User } from '../models/User.js';

function signToken(user) {
  return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'devsecret', {
    expiresIn: '7d',
  });
}

export async function register(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });
    const passwordHash = await User.hashPassword(password);
    const user = await User.create({ name, email, passwordHash, role });
    const token = signToken(user);
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, points: user.points }, token });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const valid = await user.validatePassword(password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = signToken(user);
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, points: user.points }, token });
  } catch (err) {
    next(err);
  }
}

