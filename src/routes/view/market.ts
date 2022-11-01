import { Router } from 'express';
import { market, marketCreate } from '../../controller/view/market';

const router = Router();

router.get('/', [], market);

router.get('/create', [], marketCreate);

export default router;
