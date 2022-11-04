import { Router } from 'express';
import {
  notice,
  noticeCreate,
  noticeCreateFunction,
  noticeDeleteFunction,
  noticeUpdate,
  noticeUpdateFunction
} from '../../controller/view/notice';
import { checkAuth } from '../../middleware/validation/checkAuth';

const router = Router();

router.get('/:site', [checkAuth], notice);

router.get('/:site/create', [checkAuth], noticeCreate);

router.post('/:site/create', [], noticeCreateFunction);

router.get('/:site/update/:id', [checkAuth], noticeUpdate);

router.patch('/:site/update/:id', [], noticeUpdateFunction);

router.delete('/:site/delete/:id', [], noticeDeleteFunction);

export default router;
