const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0 },
    category: { type: String },
    images: [{ type: String }],
    materialSourceBatch: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);