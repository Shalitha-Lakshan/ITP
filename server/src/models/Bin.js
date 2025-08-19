import mongoose from 'mongoose';

const binSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: { type: [Number], required: true }, // [lng, lat]
    },
    address: { type: String },
    city: { type: String },
    isActive: { type: Boolean, default: true },
    currentWeightKg: { type: Number, default: 0 },
    capacityKg: { type: Number, default: 50 },
  },
  { timestamps: true }
);

binSchema.index({ location: '2dsphere' });

export const Bin = mongoose.model('Bin', binSchema);