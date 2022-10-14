import { Router } from 'express';
import { add } from '../../controller/contact';
import { validatorContactInput } from '../../middleware/validation/validatorContactInput';

const router = Router();

router.post('/', [validatorContactInput], add);

export default router;
