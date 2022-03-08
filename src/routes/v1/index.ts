import { Router } from 'express';
import checkIp from './checkIp';
import contact from './contact';
import focus from './focus';
import news from './news';
import notice from './notice';
import quotation from './quotation';
import response from './response';

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
 *         name:
 *           type: string
 *         surname:
 *           type: string
 *         mobile:
 *           type: string
 *         email:
 *           type: string
 *         area:
 *           type: string
 *         type:
 *           type: string
 *         iScustomer:
 *           type: string
 *         login:
 *           type: string
 *         content:
 *           type: string
 *       required:
 *           - name
 *           - surname
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
 * /focus:
 *   get:
 *     summary: 財經新聞
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
router.use('/focus', focus);

/**
 * @swagger
 * /news:
 *   get:
 *     summary: 取得即時新聞
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
 * /notice:
 *   get:
 *     summary: 平台公告
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
router.use('/notice', notice);

/**
 * @swagger
 * /quotation:
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
router.use('/quotation', quotation);

/**
 * @swagger
 * /response:
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
router.use('/response', response);

export default router;
