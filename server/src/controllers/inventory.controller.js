import { InventoryItem } from '../models/InventoryItem.js';

export async function addInventory(req, res, next) {
  try {
    const { category, color, weightKg, source } = req.body;
    const item = await InventoryItem.create({ category, color, weightKg, source });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function listInventory(req, res, next) {
  try {
    const { category, color } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (color) filter.color = color;
    const items = await InventoryItem.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function totals(_req, res, next) {
  try {
    const byCategory = await InventoryItem.aggregate([
      { $group: { _id: '$category', weightKg: { $sum: '$weightKg' } } },
    ]);
    const byColor = await InventoryItem.aggregate([
      { $group: { _id: '$color', weightKg: { $sum: '$weightKg' } } },
    ]);
    res.json({ byCategory, byColor });
  } catch (err) {
    next(err);
  }
}

