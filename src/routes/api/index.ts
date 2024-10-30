import { Router } from 'express';
import broker from './broker';
import checkIp from './checkIp';
import contact from './contact';
import market from './market';
import mlxyh from './mlxyh';
import notice from './notice';
import responsibility from './responsibility';
import wcgtgh from './wcgtgh';

const router = Router();

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
 * /notice:
 *   get:
 *     summary: 平台公告
 *     parameters:
 *     - name: lang
 *       in: query
 *       required: true
 *       type: string
 *     - name: site
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
router.use('/notice', notice);

/**
 * @swagger
 * /market:
 *   get:
 *     summary: 市場分析
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
router.use('/market', market);

/**
 * @swagger
 * /responsibility:
 *   get:
 *     summary: 企業責任
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
router.use('/responsibility', responsibility);

/**
 * @swagger
 * /wcgtgh:
 *   post:
 *     summary: 廣告投放 WCGTGH (國際)
 *     parameters:
 *     - name: body
 *       in: body
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         mobile:
 *           type: string
 *         qq:
 *           type: string
 *       required:
 *           - name
 *           - email
 *           - mobile
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Client error
 *       500:
 *         description: Server error
 */

router.use('/wcgtgh', wcgtgh);

/**
 * @swagger
 * /mlxyh:
 *   post:
 *     summary: 廣告投放 MLXYH (國際)
 *     parameters:
 *     - name: body
 *       in: body
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         account:
 *           type: string
 *       required:
 *           - name
 *           - email
 *           - account
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Client error
 *       500:
 *         description: Server error
 */

router.use('/mlxyh', mlxyh);

/**
 * @swagger
 * /broker:
 *   post:
 *     summary: 成為代理 (金業)
 *     parameters:
 *     - name: body
 *       in: body
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         mobile:
 *           type: string
 *         qq:
 *           type: string
 *       required:
 *           - name
 *           - email
 *           - mobile
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Client error
 *       500:
 *         description: Server error
 */

router.use('/broker', broker);

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

export default router;
