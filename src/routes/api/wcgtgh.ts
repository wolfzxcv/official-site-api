import { Router } from 'express';
import { wcgtgh } from '../../controller/promotion';
import { validatorPromotionInput } from '../../middleware/validation/validatorPromotionInput';

const router = Router();

router.post('/', [validatorPromotionInput], wcgtgh);

export default router;
