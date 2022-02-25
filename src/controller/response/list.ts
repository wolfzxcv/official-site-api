import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { checkLang } from '../../middleware/validation/checkQuery';
import { ResponseE } from '../../orm/entities';
import { formatOutput, MAX_QUERY } from '../../utils';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryValue = checkLang(req.query);
    if (!!queryValue) {
      const responseERepository = getRepository(ResponseE);
      const response = await responseERepository.find({
        where: [{ lang: queryValue }],
        order: {
          showTime: 'DESC',
          time: 'DESC'
        },
        take: MAX_QUERY()
      });

      const output = formatOutput(response);

      res.customResponse(200, 'success', output);
    } else {
      res.customResponse(400, 'Please input valid lang in query');
    }
  } catch (err) {
    next(res.customResponse(500, 'error', null, err));
  }
};
