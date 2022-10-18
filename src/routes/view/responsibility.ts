import { Router } from 'express';
import { responsibility } from '../../controller/view/responsibility';
import { checkAuth } from '../../middleware/validation/checkAuth';

const router = Router();

router.get('/', [checkAuth], responsibility);

export default router;
