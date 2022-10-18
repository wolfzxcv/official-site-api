import { Router } from 'express';
import { market } from '../../controller/view/market';
import { checkAuth } from '../../middleware/validation/checkAuth';

const router = Router();

router.get('/', [checkAuth], market);

export default router;
