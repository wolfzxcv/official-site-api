import { Router } from 'express';
import {
  announcement,
  announcementCreate,
  announcementCreateFunction,
  announcementDeleteFunction,
  announcementUpdate,
  announcementUpdateFunction
} from '../../controller/view/announcement';
import { checkAuth } from '../../middleware/validation/checkAuth';

const router = Router();

router.get('/', [checkAuth], announcement);

router.get('/create', [checkAuth], announcementCreate);

router.post('/create', [], announcementCreateFunction);

router.get('/update/:id', [checkAuth], announcementUpdate);

router.patch('/update/:id', [], announcementUpdateFunction);

router.delete('/delete/:id', [], announcementDeleteFunction);

export default router;
