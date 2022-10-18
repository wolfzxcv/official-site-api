import { NextFunction, Request, Response } from 'express';
import { customCodes } from '../../middleware/response/customCodes';

export const log = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.render('log.ejs', {
      name: req.session.user?.username || 'Guest?'
    });
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};
