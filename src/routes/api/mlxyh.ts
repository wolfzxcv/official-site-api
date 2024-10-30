import { Router } from 'express';
import { mlxyh } from '../../controller/promotion';
import { validatorPromotionInput } from '../../middleware/validation/validatorPromotionInput';

const router = Router();

router.post('/', [validatorPromotionInput], mlxyh);

export default router;
