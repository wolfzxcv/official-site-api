import { Router } from 'express';
import { login } from '../../controller/view/login';

const router = Router();

router.get('/', [], login);

export default router;
