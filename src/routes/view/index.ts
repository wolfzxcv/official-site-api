import { Router } from 'express';
import contact from './contact';
import log from './log';
import login from './login';
import market from './market';
import notice from './notice';
import responsibility from './responsibility';

const router = Router();

router.use('/', login);

router.use('/market', market);
router.use('/notice', notice);
router.use('/responsibility', responsibility);
router.use('/contact', contact);

router.use('/log', log);

export default router;
