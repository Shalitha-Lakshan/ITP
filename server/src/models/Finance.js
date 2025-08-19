import mongoose from 'mongoose';

const financeSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['EPF', 'ETF', 'WAGE', 'OTHER'], required: true },
    staff: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Finance = mongoose.model('Finance', financeSchema);

