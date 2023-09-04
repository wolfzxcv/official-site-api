import { Router } from 'express';

import announcement from './announcement';
import contact from './contact';
import log from './log';
import login from './login';
import logout from './logout';
import verifyCode from './verifyCode';

const router = Router();

router.use('/', login);
router.use('/logout', logout);
router.use('/verifyCode', verifyCode);

router.use('/announcement', announcement);
router.use('/contact', contact);

router.use('/log', log);

export default router;
