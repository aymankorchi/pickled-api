// src/routes/products.ts
import { Router } from 'express';
import { Product } from '../models'; // import from src/models/index.ts

const router = Router();

router.get('/', async (_req, res) => {
  const items = await Product.findAll();
  res.json(items);
});

router.post('/', async (req, res) => {
  try {
    const item = await Product.create(req.body);
    res.status(201).json(item);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
