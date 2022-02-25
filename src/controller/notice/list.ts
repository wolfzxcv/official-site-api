import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { checkLang } from '../../middleware/validation/checkQuery';
import { Notice } from '../../orm/entities';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryValue = checkLang(req.query);
    if (!!queryValue) {
      const noticeRepository = getRepository(Notice);
      const notice = await noticeRepository.find({
        where: [{ lang: queryValue }]
      });

      res.customResponse(200, 'success', notice);
    } else {
      res.customResponse(400, 'Please input valid lang in query');
    }
  } catch (err) {
    next(res.customResponse(500, 'error', null, err));
  }
};
