import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Quotation } from '../../config/typeorm/entities';
import { customCodes } from '../../middleware/response/customCodes';
import { checkLang } from '../../middleware/validation/checkQuery';
import { formatOutput, MAX_QUERY } from '../../utils';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryValue = checkLang(req.query);
    if (!!queryValue) {
      const quotationRepository = getRepository(Quotation);
      const quotation = await quotationRepository.find({
        where: [{ lang: queryValue }],
        order: {
          showTime: 'DESC',
          time: 'DESC'
        },
        take: MAX_QUERY()
      });

      const output = formatOutput(quotation);

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
