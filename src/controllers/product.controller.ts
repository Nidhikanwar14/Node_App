import { Request, Response } from 'express';
import * as productService from '../services/product.service';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err?.message || 'Failed to create product' });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const product = await productService.getAllProducts();
    res.json(product);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to fetch product' });
  }
};
