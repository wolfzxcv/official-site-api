import { Router } from 'express';
import checkIp from './checkIp';
import contact from './contact';
import focus from './focus';
import news from './news';
import notice from './notice';
import quotation from './quotation';
import response from './response';

const router = Router();

router.use('/checkIp', checkIp);
router.use('/contact', contact);
router.use('/focus', focus);
router.use('/news', news);
router.use('/notice', notice);
router.use('/quotation', quotation);
router.use('/response', response);

export default router;
