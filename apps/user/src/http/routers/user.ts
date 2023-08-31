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
import { authUserMiddleware, authAdminMiddleware } from '../middleware';
import { meta } from '../handlers/meta';
import { maintenance } from '../handlers/maintenace';

const router = Router();

router.post(
  '/',
  userValidator,
  validatorMiddleware,
  asyncHandler(adduserHandler)
);
router.get('/', authUserMiddleware, asyncHandler(findUserHandler));
router.get('/all', authAdminMiddleware, asyncHandler(findAllUsersHandler));
router.post(
  '/login',
  userLoginValidator,
  validatorMiddleware,
  asyncHandler(loginUserHandler)
);
router.get('/meta', asyncHandler(meta));
router.get('/maintenace', authAdminMiddleware, asyncHandler(maintenance));

export default router;
