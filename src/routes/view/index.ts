import { Router } from 'express';

import broker from './broker';
import contact from './contact';
import log from './log';
import login from './login';
import logout from './logout';
import market from './market';
import notice from './notice';
import responsibility from './responsibility';
import verifyCode from './verifyCode';
import wcgtgh from './wcgtgh';

const router = Router();

router.use('/', login);
router.use('/logout', logout);
router.use('/verifyCode', verifyCode);

router.use('/market', market);
router.use('/notice', notice);

router.use('/responsibility', responsibility);
router.use('/contact', contact);

router.use('/wcgtgh', wcgtgh);
router.use('/broker', broker);

router.use('/log', log);

export default router;
