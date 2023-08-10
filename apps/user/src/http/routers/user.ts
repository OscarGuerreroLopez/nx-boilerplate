import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { adduserHandler } from '../handlers/addUser';
import { findAllUsersHandler, findUserHandler } from '../handlers/findUsers';
import {
  UserLoginValidator,
  UserValidator,
} from '../validators/user.validator';
import { ValidatorMiddleware } from '@boilerplate/middleware';
import { loginUserHandler } from '../handlers/loginUser';

const router = Router();

router.post(
  '/',
  UserValidator,
  ValidatorMiddleware,
  asyncHandler(adduserHandler)
);
router.get('/', asyncHandler(findUserHandler));
router.get('/all', asyncHandler(findAllUsersHandler));
router.post(
  '/login',
  UserLoginValidator,
  ValidatorMiddleware,
  asyncHandler(loginUserHandler)
);

export default router;
