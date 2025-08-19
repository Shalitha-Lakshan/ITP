import { Bin } from '../models/Bin.js';

export async function createBin(req, res, next) {
  try {
    const { code, address, city, lng, lat, capacityKg } = req.body;
    const bin = await Bin.create({ code, address, city, capacityKg, location: { type: 'Point', coordinates: [lng, lat] } });
    res.status(201).json(bin);
  } catch (err) {
    next(err);
  }
}

export async function listBins(_req, res, next) {
  try {
    const bins = await Bin.find();
    res.json(bins);
  } catch (err) {
    next(err);
  }
}

