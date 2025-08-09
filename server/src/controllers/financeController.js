const Transaction = require('../models/Transaction');

exports.listTransactions = async (req, res) => {
  try {
    const txs = await Transaction.find().sort({ createdAt: -1 });
    res.json(txs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.recordExpense = async (req, res) => {
  try {
    const { amount, currency, method, metadata } = req.body;
    const tx = await Transaction.create({ type: 'expense', amount, currency: currency || 'USD', method, metadata });
    res.status(201).json(tx);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};