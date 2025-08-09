const Deposit = require('../models/Deposit');
const User = require('../models/User');
const RewardLedger = require('../models/RewardLedger');
const InventoryItem = require('../models/InventoryItem');

function calculatePoints({ quantityBottles, weightKg }) {
  // Simple rule: 1 point per bottle, or 2 points per kg, whichever is higher
  const perBottle = quantityBottles;
  const perKg = Math.floor((weightKg || 0) * 2);
  return Math.max(perBottle, perKg);
}

exports.createDeposit = async (req, res) => {
  try {
    const { binId, quantityBottles, weightKg } = req.body;
    if (!binId || !quantityBottles) return res.status(400).json({ error: 'binId and quantityBottles are required' });

    const points = calculatePoints({ quantityBottles, weightKg });

    const deposit = await Deposit.create({
      user: req.user.id,
      bin: binId,
      quantityBottles,
      weightKg,
      pointsAwarded: points
    });

    const user = await User.findById(req.user.id);
    user.points += points;
    await user.save();

    await RewardLedger.create({
      user: user._id,
      deltaPoints: points,
      reason: 'Bottle deposit',
      referenceModel: 'Deposit',
      referenceId: deposit._id,
      balanceAfter: user.points
    });

    // Create inventory record at 'collected' stage
    await InventoryItem.create({
      itemType: 'bottle',
      stage: 'collected',
      quantityUnits: quantityBottles,
      weightKg: weightKg || 0,
      sourceDeposit: deposit._id,
      currentLocation: 'bin'
    });

    res.status(201).json({ depositId: deposit._id, pointsAwarded: points, totalPoints: user.points });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listMyDeposits = async (req, res) => {
  try {
    const deposits = await Deposit.find({ user: req.user.id }).sort({ createdAt: -1 }).populate('bin');
    res.json(deposits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};