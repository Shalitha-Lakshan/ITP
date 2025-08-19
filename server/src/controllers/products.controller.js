import { Product } from '../models/Product.js';

export async function createProduct(req, res, next) {
  try {
    const { name, description, price, stock, images } = req.body;
    const product = await Product.create({ name, description, price, stock, images });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

export async function listProducts(_req, res, next) {
  try {
    const products = await Product.find({ isActive: true });
    res.json(products);
  } catch (err) {
    next(err);
  }
}

