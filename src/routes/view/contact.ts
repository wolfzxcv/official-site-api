import { Router } from 'express';
import { contact } from '../../controller/view/contact';

const router = Router();

router.get('/', [], contact);

export default router;
