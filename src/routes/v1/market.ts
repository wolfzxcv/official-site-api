import { Router } from 'express';
import { list } from '../../controller/market';

const router = Router();

router.get('/', [], list);

export default router;
