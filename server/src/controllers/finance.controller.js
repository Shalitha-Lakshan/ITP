import { Finance } from '../models/Finance.js';

export async function recordFinance(req, res, next) {
  try {
    const { type, staff, amount, description, date } = req.body;
    const entry = await Finance.create({ type, staff, amount, description, date });
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
}

export async function listFinance(req, res, next) {
  try {
    const { type } = req.query;
    const filter = {};
    if (type) filter.type = type;
    const entries = await Finance.find(filter).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    next(err);
  }
}

