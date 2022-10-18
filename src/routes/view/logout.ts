import { Router } from 'express';
import { logout } from '../../controller/view/logout';

const router = Router();

router.get('/', [], logout);

export default router;
