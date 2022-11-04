import { Router } from 'express';
import {
  responsibility,
  responsibilityCreate,
  responsibilityCreateFunction,
  responsibilityDeleteFunction,
  responsibilityUpdate,
  responsibilityUpdateFunction
} from '../../controller/view/responsibility';
import { checkAuth } from '../../middleware/validation/checkAuth';

const router = Router();

router.get('/', [checkAuth], responsibility);

router.get('/create', [checkAuth], responsibilityCreate);

router.post('/create', [], responsibilityCreateFunction);

router.get('/update/:id', [checkAuth], responsibilityUpdate);

router.patch('/update/:id', [], responsibilityUpdateFunction);

router.delete('/delete/:id', [], responsibilityDeleteFunction);

export default router;
