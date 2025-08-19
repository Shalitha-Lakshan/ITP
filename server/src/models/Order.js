import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
      },
    ],
    subtotal: { type: Number, required: true },
    pointsRedeemed: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: { type: String, enum: ['PENDING', 'PAID', 'SHIPPED', 'COMPLETED', 'CANCELLED'], default: 'PENDING' },
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', orderSchema);