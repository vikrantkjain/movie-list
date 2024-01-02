import { Router } from 'express';
import controller from '../controllers';
import middleware from '../middleware';
import validation from '../validations';

const { userMiddleware, validateMiddleware, authMiddleware } = middleware;
const { accountValidator } = validation;
const { accountController } = controller;

const router = Router();

router.post(
  '/login',
  validateMiddleware({ schema: accountValidator.loginSchema }),
  userMiddleware.checkUserExist,
  accountController.login,
);

router.post(
  '/logout',
  authMiddleware,
  accountController.logout,
);

export default router;
