import { Router } from 'express';
import { notice } from '../../controller/view/notice';

import { checkAuth } from '../../middleware/validation/checkAuth';

const router = Router();

router.get('/:id', [checkAuth], notice);

export default router;
