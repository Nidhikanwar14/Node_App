import { Router } from 'express';
import userRouter from '../routes/user.routes';
import productRouter from './product.routes';
import * as userController from '../controllers/user.controller';
const router = Router();

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/login', userController.login);
router.use('/forgot-password', userController.forgotPassword);
router.use('/reset-password', userController.resetPassword);

export default router;
