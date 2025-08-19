import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema(
  {
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bin: { type: mongoose.Schema.Types.ObjectId, ref: 'Bin', required: true },
    status: { type: String, enum: ['PENDING', 'PICKED', 'DELIVERED', 'CANCELLED'], default: 'PENDING' },
    pickupWeightKg: { type: Number, default: 0 },
    deliveredWeightKg: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Delivery = mongoose.model('Delivery', deliverySchema);

