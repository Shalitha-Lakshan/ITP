import { ManufacturerTake } from '../models/ManufacturerTake.js';
import { InventoryItem } from '../models/InventoryItem.js';

export async function takeFromInventory(req, res, next) {
  try {
    const { items } = req.body; // [{category,color,weightKg}]
    for (const line of items) {
      await InventoryItem.create({ category: line.category, color: line.color || 'MIXED', weightKg: -Math.abs(line.weightKg), source: 'ADJUSTMENT' });
    }
    const take = await ManufacturerTake.create({ manufacturer: req.user.id, items });
    res.status(201).json(take);
  } catch (err) {
    next(err);
  }
}

