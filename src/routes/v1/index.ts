import { Router } from 'express';
import checkIp from './checkIp';
import news from './news';

const router = Router();

router.use('/news', news);
router.use('/checkIp', checkIp);

export default router;
