import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { adduserHandler } from '../handlers/addUser';
import { findAllUsersHandler, findUserHandler } from '../handlers/findUsers';
import {
  userLoginValidator,
  userValidator,
} from '../validators/user.validator';
import { validatorMiddleware } from '@boilerplate/middleware';
import { loginUserHandler } from '../handlers/loginUser';
import { authUserMiddleware } from '../middleware';

const router = Router();

router.post(
  '/',
  userValidator,
  validatorMiddleware,
  asyncHandler(adduserHandler)
);
router.get('/', authUserMiddleware, asyncHandler(findUserHandler));
router.get('/all', asyncHandler(findAllUsersHandler));
router.post(
  '/login',
  userLoginValidator,
  validatorMiddleware,
  asyncHandler(loginUserHandler)
);

export default router;
