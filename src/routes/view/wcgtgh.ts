import { Router } from 'express';
import { wcgtgh } from '../../controller/view/wcgtgh';
import { checkAuth } from '../../middleware/validation/checkAuth';

const router = Router();

router.get('/', [checkAuth], wcgtgh);

export default router;
