import { Router } from 'express';
import { checkIp } from '../../controller/checkIp';

const router = Router();

router.get('/', [], checkIp);

export default router;
