import { Router } from 'express';
import user from './routers/user';

const router = Router();

router.use('/user', user);

export default router as Router;
