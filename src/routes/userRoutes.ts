import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validation';
import { createUserValidation, updateUserValidation } from '../validations/userValidations';

const router = Router();
const userController = new UserController();

// @ts-expect-error
router.post('/', validate(createUserValidation), (req, res, next) => {
  userController.createUser(req, res).catch(next);
});
router.get('/me', authenticate, (req, res, next) => {
  userController.getUser(req, res).catch(next);
});
// @ts-expect-error
router.patch('/me', authenticate, validate(updateUserValidation), (req, res, next) => {
  userController.updateUser(req, res).catch(next);
});

export default router; 