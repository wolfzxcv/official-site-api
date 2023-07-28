import { Router } from 'express';
import {
  news,
  newsCreate,
  newsCreateFunction,
  newsDeleteFunction,
  newsUpdate,
  newsUpdateFunction
} from '../../controller/view/news';
import { checkAuth } from '../../middleware/validation/checkAuth';

const router = Router();

router.get('/', [checkAuth], news);

router.get('/create', [checkAuth], newsCreate);

router.post('/create', [], newsCreateFunction);

router.get('/update/:id', [checkAuth], newsUpdate);

router.patch('/update/:id', [], newsUpdateFunction);

router.delete('/delete/:id', [], newsDeleteFunction);

export default router;
