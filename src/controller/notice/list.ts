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
      let noticeRepository;

      switch (querySite) {
        case 'b':
          noticeRepository = appDataSource.getRepository(NoticeG);
          break;
        case 'm':
          noticeRepository = appDataSource.getRepository(NoticeM);
          break;
        default:
          noticeRepository = appDataSource.getRepository(NoticeG);
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

      res.customResponse(customCodes.success, 'success', output);
    } else {
      res.customResponse(
        customCodes.clientError,
        'Please input valid lang in query'
      );
    }
  } catch (err) {
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};
