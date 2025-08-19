import { Drop } from '../models/Drop.js';
import { User } from '../models/User.js';
import { Bin } from '../models/Bin.js';

const POINTS_PER_KG = 10;

export async function recordDrop(req, res, next) {
  try {
    const { binId, weightKg } = req.body;
    const pointsAwarded = Math.round(weightKg * POINTS_PER_KG);
    const drop = await Drop.create({ user: req.user.id, bin: binId, weightKg, pointsAwarded });
    await User.findByIdAndUpdate(req.user.id, { $inc: { points: pointsAwarded } });
    await Bin.findByIdAndUpdate(binId, { $inc: { currentWeightKg: weightKg } });
    res.status(201).json(drop);
  } catch (err) {
    next(err);
  }
}

export async function listDrops(req, res, next) {
  try {
    const filter = req.user.role === 'ADMIN' ? {} : { user: req.user.id };
    const drops = await Drop.find(filter).populate('bin', 'code city');
    res.json(drops);
  } catch (err) {
    next(err);
  }
}

