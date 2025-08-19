import { createObjectCsvWriter } from 'csv-writer';
import { InventoryItem } from '../models/InventoryItem.js';
import { Drop } from '../models/Drop.js';
import { Order } from '../models/Order.js';
import fs from 'fs';
import path from 'path';

export async function inventorySummaryCsv(_req, res, next) {
  try {
    const data = await InventoryItem.aggregate([
      { $group: { _id: { category: '$category', color: '$color' }, weightKg: { $sum: '$weightKg' } } },
    ]);
    const file = path.join('/workspace', 'inventory-summary.csv');
    const csvWriter = createObjectCsvWriter({
      path: file,
      header: [
        { id: 'category', title: 'CATEGORY' },
        { id: 'color', title: 'COLOR' },
        { id: 'weightKg', title: 'WEIGHT_KG' },
      ],
    });
    await csvWriter.writeRecords(
      data.map((d) => ({ category: d._id.category, color: d._id.color, weightKg: d.weightKg }))
    );
    const stream = fs.createReadStream(file);
    res.setHeader('Content-Type', 'text/csv');
    stream.pipe(res);
  } catch (err) {
    next(err);
  }
}

export async function dropsSummary(_req, res, next) {
  try {
    const data = await Drop.aggregate([
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, weightKg: { $sum: '$weightKg' }, points: { $sum: '$pointsAwarded' } } },
      { $sort: { _id: 1 } },
    ]);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function salesSummary(_req, res, next) {
  try {
    const data = await Order.aggregate([
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, revenue: { $sum: '$total' } } },
      { $sort: { _id: 1 } },
    ]);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

