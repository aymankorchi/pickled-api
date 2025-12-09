// src/routes/products.ts
import { Router, Request, Response, NextFunction } from 'express';
import { body, param } from 'express-validator';
import { Product } from '../models';
import { handleValidationErrors } from '../middleware/validate';

const router = Router();

// Validation rules
const productCreateRules = [
  body('name').isString().trim().isLength({ min: 1 }).withMessage('Name is required'),
  body('description').optional().isString().trim(),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be an integer >= 0'),
];

const productUpdateRules = [
  body('name').optional().isString().trim().isLength({ min: 1 }).withMessage('Name must be a non-empty string'),
  body('description').optional().isString().trim(),
  body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be an integer >= 0'),
];

const idParamRule = [param('id').isInt().withMessage('Invalid product id')];

// List products
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const products = await Product.findAll();
    return res.json(products);
  } catch (err) {
    return next(err);
  }
});

// Get single product
router.get('/:id', idParamRule, handleValidationErrors, async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const id = Number(req.params.id);
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.json(product);
  } catch (err) {
    return next(err);
  }
});

// Create product
router.post('/', productCreateRules, handleValidationErrors, async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { name, description, price, stock } = req.body;
    const product = await Product.create({ name, description, price, stock });
    return res.status(201).json(product);
  } catch (err) {
    return next(err);
  }
});

// Update product
router.put('/:id', idParamRule.concat(productUpdateRules), handleValidationErrors, async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const id = Number(req.params.id);
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const { name, description, price, stock } = req.body;
    await product.update({ name, description, price, stock });
    return res.json(product);
  } catch (err) {
    return next(err);
  }
});

// Delete product
router.delete('/:id', idParamRule, handleValidationErrors, async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const id = Number(req.params.id);
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.destroy();
    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
});

export default router;
