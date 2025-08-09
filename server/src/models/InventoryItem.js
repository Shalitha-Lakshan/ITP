const mongoose = require('mongoose');

const InventoryItemSchema = new mongoose.Schema(
  {
    itemType: { type: String, enum: ['bottle', 'material', 'product'], required: true },
    stage: {
      type: String,
      enum: ['collected', 'sorted', 'cleaned', 'shredded', 'pelletized', 'manufactured'],
      required: true,
      index: true
    },
    quantityUnits: { type: Number, default: 0 },
    weightKg: { type: Number, default: 0 },
    sourceDeposit: { type: mongoose.Schema.Types.ObjectId, ref: 'Deposit' },
    currentLocation: { type: String },
    batchId: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('InventoryItem', InventoryItemSchema);