import { Router } from 'express';
import { list } from '../../controller/news';

const router = Router();

router.get('/', [], list);

export default router;
