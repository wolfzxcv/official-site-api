import { Router } from 'express';
import { verifyCode } from '../../controller/view/verifyCode';

const router = Router();

router.get('/', [], verifyCode);

export default router;
