import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { adduserHandler } from '../handlers/addUser';
import { findAllUsersHandler, findUserHandler } from '../handlers/findUsers';

const router = Router();

router.post('/', asyncHandler(adduserHandler));
router.get('/', asyncHandler(findUserHandler));
router.get('/all', asyncHandler(findAllUsersHandler));

export default router;
