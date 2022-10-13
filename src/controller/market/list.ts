import { NextFunction, Request, Response } from 'express';
import { Market } from '../../config/typeorm/entities';
import { appDataSource } from '../../data-source';
import { customCodes } from '../../middleware/response/customCodes';
import { checkLang } from '../../middleware/validation/checkQuery';
import { formatOutput, MAX_QUERY } from '../../utils';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryValue = checkLang(req.query);
    if (!!queryValue) {
      const marketRepository = appDataSource.getRepository(Market);
      const market = await marketRepository.find({
        where: [{ lang: queryValue }],
        order: {
          showTime: 'DESC',
          createTime: 'DESC'
        },
        take: MAX_QUERY()
      });

      const output = formatOutput(market);

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
