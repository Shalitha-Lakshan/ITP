import mongoose from 'mongoose';

const manufacturerTakeSchema = new mongoose.Schema(
  {
    manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        category: { type: String, required: true },
        color: { type: String },
        weightKg: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const ManufacturerTake = mongoose.model('ManufacturerTake', manufacturerTakeSchema);

