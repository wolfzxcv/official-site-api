import { Router } from 'express';
import { list } from '../../controller/focus';

const router = Router();

router.get('/', [], list);

export default router;
