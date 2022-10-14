import { Router } from 'express';
import { log } from '../../controller/view/log';

const router = Router();

router.get('/', [], log);

export default router;
