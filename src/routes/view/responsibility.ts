import { Router } from 'express';
import { responsibility } from '../../controller/view/responsibility';

const router = Router();

router.get('/', [], responsibility);

export default router;
