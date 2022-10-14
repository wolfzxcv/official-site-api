import { Router } from 'express';
import { list } from '../../controller/notice';

const router = Router();

router.get('/', [], list);

export default router;
