const mongoose = require('mongoose');

const RewardLedgerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    deltaPoints: { type: Number, required: true },
    reason: { type: String },
    referenceModel: { type: String },
    referenceId: { type: mongoose.Schema.Types.ObjectId },
    balanceAfter: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('RewardLedger', RewardLedgerSchema);