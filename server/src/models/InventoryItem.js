import mongoose from 'mongoose';

const inventoryItemSchema = new mongoose.Schema(
  {
    category: { type: String, enum: ['BOTTLE', 'LID', 'SHRED_DUST', 'SHRED_RICE', 'SHRED_RING'], required: true },
    color: { type: String, enum: ['MIXED', 'WHITE', 'BLUE', 'GREEN', 'RED', 'YELLOW', 'BLACK', 'OTHER'], default: 'MIXED' },
    weightKg: { type: Number, required: true },
    source: { type: String, enum: ['DROP', 'PROCESSING', 'ADJUSTMENT'], default: 'DROP' },
  },
  { timestamps: true }
);

export const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);