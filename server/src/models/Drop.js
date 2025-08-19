import mongoose from 'mongoose';

const dropSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bin: { type: mongoose.Schema.Types.ObjectId, ref: 'Bin', required: true },
    weightKg: { type: Number, required: true },
    pointsAwarded: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Drop = mongoose.model('Drop', dropSchema);

