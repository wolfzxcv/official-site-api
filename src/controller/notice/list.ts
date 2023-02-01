import { NextFunction, Request, Response } from 'express';
import { NoticeG, NoticeM } from '../../config/typeorm/entities';
import { appDataSource } from '../../data-source';
import { customCodes } from '../../middleware/response/customCodes';
import { checkLang, checkSite } from '../../middleware/validation/checkQuery';
import { formatOutput, MAX_QUERY } from '../../utils';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryLang = checkLang(req.query);
    const querySite = checkSite(req.query);

    if (!!queryLang && !!querySite) {
      let noticeRepository = appDataSource.getRepository(NoticeG);

      switch (querySite) {
        case 'm':
          noticeRepository = appDataSource.getRepository(NoticeM);
          break;
        default:
          break;
      }
      const notice = await noticeRepository.find({
        where: [{ lang: queryLang }],
        order: {
          showTime: 'DESC',
          createTime: 'DESC'
        },
        take: MAX_QUERY()
      });

      const output = formatOutput(notice);

      const topItems = output.filter(x => x.onTop === true);

      const restItems = output.filter(x => x.onTop !== true);

      const outputResult = [...topItems, ...restItems];

      res.customResponse(customCodes.success, 'success', outputResult);

      res.customResponse(customCodes.success, 'success', output);
    } else {
      res.customResponse(
        customCodes.clientError,
        'Please input valid lang and site in query'
      );
    }
  } catch (err) {
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};
