import { Router } from 'express';
import { notice } from '../../controller/view/notice';

const router = Router();

router.get('/', [], notice);

export default router;
