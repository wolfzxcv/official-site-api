import { Router } from 'express';
import { mlxyh } from '../../controller/view/mlxyh';
import { checkAuth } from '../../middleware/validation/checkAuth';

const router = Router();

router.get('/', [checkAuth], mlxyh);

export default router;
