import { Router } from 'express';
import { broker } from '../../controller/broker';
import { validatorPromotionInput } from '../../middleware/validation/validatorPromotionInput';

const router = Router();

router.post('/', [validatorPromotionInput], broker);

export default router;
