import { Router } from 'express';
import {
  market,
  marketCreate,
  marketCreateFunction,
  marketDeleteFunction,
  marketUpdate
} from '../../controller/view/market';

const router = Router();

router.get('/', [], market);

router.get('/create', [], marketCreate);

router.post('/create', [], marketCreateFunction);

router.get('/update/:id', [], marketUpdate);

router.delete('/delete/:id', [], marketDeleteFunction);

export default router;
