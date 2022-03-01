import { Router } from 'express';
import { add } from '../../controller/contact';

const router = Router();

router.post('/', [], add);

export default router;
