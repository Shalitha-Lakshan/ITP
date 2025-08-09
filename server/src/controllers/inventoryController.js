const InventoryItem = require('../models/InventoryItem');

exports.summary = async (req, res) => {
  try {
    const pipeline = [
      { $group: { _id: { stage: '$stage', itemType: '$itemType' }, quantityUnits: { $sum: '$quantityUnits' }, weightKg: { $sum: '$weightKg' } } },
      { $project: { _id: 0, stage: '$_id.stage', itemType: '$_id.itemType', quantityUnits: 1, weightKg: 1 } }
    ];
    const result = await InventoryItem.aggregate(pipeline);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.advanceStage = async (req, res) => {
  try {
    const { fromStage, toStage, quantityUnits, weightKg } = req.body;
    if (!fromStage || !toStage) return res.status(400).json({ error: 'fromStage and toStage are required' });

    // Record an aggregated movement as a new inventory record at target stage
    const item = await InventoryItem.create({
      itemType: 'material',
      stage: toStage,
      quantityUnits: quantityUnits || 0,
      weightKg: weightKg || 0,
      currentLocation: 'facility'
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};