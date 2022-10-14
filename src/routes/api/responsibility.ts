import { Router } from 'express';
import { list } from '../../controller/responsibility';

const router = Router();

router.get('/', [], list);

export default router;
