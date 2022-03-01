import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { customCodes } from '../../middleware/response/customCodes';
import { checkLang } from '../../middleware/validation/checkQuery';
import { Notice } from '../../orm/entities';
import { formatOutput, MAX_QUERY } from '../../utils';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryValue = checkLang(req.query);
    if (!!queryValue) {
      const noticeRepository = getRepository(Notice);
      const notice = await noticeRepository.find({
        where: [{ lang: queryValue }],
        order: {
          showTime: 'DESC',
          time: 'DESC'
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
