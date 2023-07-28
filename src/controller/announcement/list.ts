import { NextFunction, Request, Response } from 'express';
import { Announcement } from '../../config/typeorm/entities';
import { appDataSource } from '../../data-source';
import { customCodes } from '../../middleware/response/customCodes';
import { checkLang } from '../../middleware/validation/checkQuery';
import { MAX_QUERY, formatOutput } from '../../utils';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryValue = checkLang(req.query);
    if (!!queryValue) {
      const announcementRepository = appDataSource.getRepository(Announcement);
      const announcement = await announcementRepository.find({
        where: [{ lang: queryValue }],
        order: {
          createTime: 'DESC'
        },
        take: MAX_QUERY()
      });

      const output = formatOutput(announcement);

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
