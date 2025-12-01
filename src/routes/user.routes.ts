import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authenticateToken } from '../../middleware/authMiddleware';

const userRouter = Router();

userRouter.post('/', userController.createUser);
userRouter.get('/', authenticateToken, userController.getUsers);
userRouter.delete('/', userController.deleteUsers);
userRouter.put('/:id', authenticateToken, userController.updateUser);
userRouter.get('/auth', authenticateToken, userController.authenticateMe);

export default userRouter;
