import { Router } from 'express';
import { contact } from '../../controller/view/contact';
import { checkAuth } from '../../middleware/validation/checkAuth';

const router = Router();

router.get('/', [checkAuth], contact);

export default router;
