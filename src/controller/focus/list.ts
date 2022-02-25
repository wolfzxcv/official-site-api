import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { checkLang } from '../../middleware/validation/checkQuery';
import { Focus } from '../../orm/entities';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryValue = checkLang(req.query);
    if (!!queryValue) {
      const focusRepository = getRepository(Focus);
      const focus = await focusRepository.find({
        where: [{ lang: queryValue }]
      });

      res.customResponse(200, 'success', focus);
    } else {
      res.customResponse(400, 'Please input valid lang in query');
    }
  } catch (err) {
    next(res.customResponse(500, 'error', null, err));
  }
};
