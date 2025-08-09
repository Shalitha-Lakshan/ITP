const mongoose = require('mongoose');

const BinSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String },
    location: {
      address: { type: String },
      latitude: { type: Number },
      longitude: { type: Number }
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bin', BinSchema);