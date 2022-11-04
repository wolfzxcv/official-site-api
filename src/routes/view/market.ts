import { Router } from 'express';
import {
  market,
  marketCreate,
  marketCreateFunction,
  marketDeleteFunction,
  marketUpdate,
  marketUpdateFunction
} from '../../controller/view/market';
import { checkAuth } from '../../middleware/validation/checkAuth';

const router = Router();

router.get('/', [checkAuth], market);

router.get('/create', [checkAuth], marketCreate);

router.post('/create', [], marketCreateFunction);

router.get('/update/:id', [checkAuth], marketUpdate);

router.patch('/update/:id', [], marketUpdateFunction);

router.delete('/delete/:id', [], marketDeleteFunction);

export default router;
