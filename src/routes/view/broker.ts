import { Router } from 'express';
import { broker } from '../../controller/view/broker';
import { checkAuth } from '../../middleware/validation/checkAuth';

const router = Router();

router.get('/', [checkAuth], broker);

export default router;
