import { Router } from 'express';
import { list } from '../../controller/announcement';

const router = Router();

router.get('/', [], list);

export default router;
