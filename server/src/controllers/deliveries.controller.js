import { Delivery } from '../models/Delivery.js';
import { Bin } from '../models/Bin.js';

export async function createDelivery(req, res, next) {
  try {
    const { binId, assignedTo } = req.body;
    const delivery = await Delivery.create({ bin: binId, assignedTo });
    res.status(201).json(delivery);
  } catch (err) {
    next(err);
  }
}

export async function updateDeliveryStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status, pickupWeightKg, deliveredWeightKg } = req.body;
    const delivery = await Delivery.findByIdAndUpdate(
      id,
      { status, pickupWeightKg, deliveredWeightKg },
      { new: true }
    );
    if (status === 'PICKED' && pickupWeightKg) {
      await Bin.findByIdAndUpdate(delivery.bin, { $inc: { currentWeightKg: -pickupWeightKg } });
    }
    res.json(delivery);
  } catch (err) {
    next(err);
  }
}

export async function listDeliveries(_req, res, next) {
  try {
    const deliveries = await Delivery.find().populate('bin', 'code city');
    res.json(deliveries);
  } catch (err) {
    next(err);
  }
}

