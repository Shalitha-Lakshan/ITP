const mongoose = require('mongoose');

const DepositSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    bin: { type: mongoose.Schema.Types.ObjectId, ref: 'Bin', required: true },
    quantityBottles: { type: Number, required: true, min: 1 },
    weightKg: { type: Number },
    pointsAwarded: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Deposit', DepositSchema);