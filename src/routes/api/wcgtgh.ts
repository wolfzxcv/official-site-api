import { Router } from 'express';
import { wcgtgh } from '../../controller/promotion/wcgtgh';
import { validatorWCGTGHInput } from '../../middleware/validation/validatorWCGTGHInput';

const router = Router();

router.post('/', [validatorWCGTGHInput], wcgtgh);

export default router;
