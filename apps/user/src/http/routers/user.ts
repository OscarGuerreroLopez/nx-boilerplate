import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { adduserHandler } from '../handlers/addUser';
import { findAllUsersHandler, findUserHandler } from '../handlers/findUsers';
import { UserValidator } from '../validators/user.validator';
import { ValidatorMiddleware } from '@boilerplate/middleware';

const router = Router();

router.post(
  '/',
  UserValidator,
  ValidatorMiddleware,
  asyncHandler(adduserHandler)
);
router.get('/', asyncHandler(findUserHandler));
router.get('/all', asyncHandler(findAllUsersHandler));

export default router;
