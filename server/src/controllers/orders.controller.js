import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';

export async function createOrder(req, res, next) {
  try {
    const { items, redeemPoints } = req.body; // items: [{product, quantity}]
    const detailedItems = [];
    let subtotal = 0;
    for (const line of items) {
      const product = await Product.findById(line.product);
      if (!product || !product.isActive) return res.status(400).json({ message: 'Invalid product' });
      const unitPrice = product.price;
      subtotal += unitPrice * line.quantity;
      detailedItems.push({ product: product._id, quantity: line.quantity, unitPrice });
      await Product.findByIdAndUpdate(product._id, { $inc: { stock: -line.quantity } });
    }
    const user = await User.findById(req.user.id);
    const pointsToRedeem = Math.min(user.points, redeemPoints || 0, Math.floor(subtotal));
    const total = Math.max(subtotal - pointsToRedeem, 0);
    const order = await Order.create({ user: req.user.id, items: detailedItems, subtotal, pointsRedeemed: pointsToRedeem, total, status: 'PAID' });
    if (pointsToRedeem > 0) await User.findByIdAndUpdate(req.user.id, { $inc: { points: -pointsToRedeem } });
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
}

export async function listOrders(req, res, next) {
  try {
    const filter = req.user.role === 'ADMIN' ? {} : { user: req.user.id };
    const orders = await Order.find(filter).populate('items.product', 'name');
    res.json(orders);
  } catch (err) {
    next(err);
  }
}

