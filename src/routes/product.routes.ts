import { Router } from 'express';
import * as productController from '../controllers/product.controller';
import { authenticateToken } from '../../middleware/authMiddleware';
const productRouter = Router();

productRouter.post('/', authenticateToken, productController.createProduct);
productRouter.get('/', authenticateToken, productController.getAllProducts);

export default productRouter;
