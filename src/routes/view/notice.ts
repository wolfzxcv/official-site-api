import { Router } from 'express';
import { notice } from '../../controller/view/notice';

const router = Router();

router.get('/:id', [], notice);

export default router;
