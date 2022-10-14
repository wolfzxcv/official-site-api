import { NextFunction, Request, Response } from 'express';
import { customCodes } from '../../middleware/response/customCodes';

export const responsibility = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.render('responsibility.ejs', {});
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};
