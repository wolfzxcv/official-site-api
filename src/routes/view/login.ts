import { Router } from 'express';
import { login, loginFunction } from '../../controller/view/login';
import { checkNotAuth } from '../../middleware/validation/checkAuth';

const router = Router();

router.get('/', [checkNotAuth], login);

router.post('/login', [], loginFunction);

export default router;
