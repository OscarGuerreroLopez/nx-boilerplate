import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { adduserHandler } from '../handlers/addUser';

const router = Router();

router.post('/', asyncHandler(adduserHandler));

export default router;
