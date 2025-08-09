const User = require('../models/User');
const RewardLedger = require('../models/RewardLedger');

exports.balance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ points: user.points });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.ledger = async (req, res) => {
  try {
    const entries = await RewardLedger.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};