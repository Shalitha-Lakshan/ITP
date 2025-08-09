const Bin = require('../models/Bin');

exports.createBin = async (req, res) => {
  try {
    const bin = await Bin.create(req.body);
    res.status(201).json(bin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listBins = async (req, res) => {
  try {
    const bins = await Bin.find().sort({ createdAt: -1 });
    res.json(bins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBin = async (req, res) => {
  try {
    const bin = await Bin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bin) return res.status(404).json({ error: 'Bin not found' });
    res.json(bin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBin = async (req, res) => {
  try {
    const bin = await Bin.findByIdAndDelete(req.params.id);
    if (!bin) return res.status(404).json({ error: 'Bin not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};