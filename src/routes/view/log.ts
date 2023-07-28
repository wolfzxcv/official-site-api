import { Router } from 'express';
import { log } from '../../controller/view/log';
import { checkAuth } from '../../middleware/validation/checkAuth';

const router = Router();

router.get('/', [checkAuth], log);

export default router;
