import { Router } from 'express';
import announcement from './announcement';
import checkIp from './checkIp';
import contact from './contact';
import news from './news';

const router = Router();

/**
 * @swagger
 * /checkIp:
 *   get:
 *     summary: 偵測 IP 來源地區
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Client error
 *       500:
 *         description: Server error
 */
router.use('/checkIp', checkIp);

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: 聯繫我們
 *     parameters:
 *     - name: body
 *       in: body
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         mobile:
 *           type: string
 *         email:
 *           type: string
 *         area:
 *           type: string
 *         type:
 *           type: string
 *         account:
 *           type: string
 *         content:
 *           type: string
 *       required:
 *           - firstName
 *           - lastName
 *           - mobile
 *           - email
 *           - area
 *           - type
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Client error
 *       500:
 *         description: Server error
 */

router.use('/contact', contact);

/**
 * @swagger
 * /news:
 *   get:
 *     summary: 分秒快訊
 *     parameters:
 *     - name: lang
 *       in: query
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Client error
 *       500:
 *         description: Server error
 */
router.use('/news', news);

/**
 * @swagger
 * /announcement:
 *   get:
 *     summary: 最新消息
 *     parameters:
 *     - name: lang
 *       in: query
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Client error
 *       500:
 *         description: Server error
 */
router.use('/announcement', announcement);

export default router;
