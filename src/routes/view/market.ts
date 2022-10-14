import { Router } from 'express';
import { market } from '../../controller/view/market';

const router = Router();

router.get('/', [], market);

export default router;
