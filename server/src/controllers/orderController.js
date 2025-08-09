const Order = require('../models/Order');
const Product = require('../models/Product');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const RewardLedger = require('../models/RewardLedger');

exports.placeOrder = async (req, res) => {
  try {
    const { items, paymentMethod, shippingAddress, usePoints } = req.body;
    if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'No items provided' });

    const productIds = items.map((i) => i.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    const productMap = new Map(products.map((p) => [String(p._id), p]));

    let total = 0;
    const orderItems = [];
    for (const item of items) {
      const product = productMap.get(item.productId);
      if (!product) return res.status(400).json({ error: 'Invalid product in cart' });
      if (product.stock < item.quantity) return res.status(400).json({ error: `Insufficient stock for ${product.name}` });
      orderItems.push({ product: product._id, quantity: item.quantity, price: product.price });
      total += product.price * item.quantity;
    }

    let pointsUsed = 0;
    if (usePoints) {
      const user = await User.findById(req.user.id);
      pointsUsed = Math.min(user.points, Math.floor(total));
      if (pointsUsed > 0) {
        user.points -= pointsUsed;
        await user.save();
        await RewardLedger.create({
          user: user._id,
          deltaPoints: -pointsUsed,
          reason: 'Redeemed for order',
          referenceModel: 'Order',
          balanceAfter: user.points
        });
        total -= pointsUsed;
      }
    }

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      total,
      status: 'paid',
      payment: { method: paymentMethod || 'cash-on-delivery', reference: Date.now().toString() },
      shippingAddress
    });

    // Update stock
    for (const item of orderItems) {
      await Product.updateOne({ _id: item.product }, { $inc: { stock: -item.quantity } });
    }

    // Record transaction
    await Transaction.create({
      user: req.user.id,
      order: order._id,
      type: 'payment',
      amount: total,
      currency: 'USD',
      method: paymentMethod || 'cash-on-delivery'
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 }).populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};