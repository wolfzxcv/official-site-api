import { NextFunction, Request, Response } from 'express';
import { customCodes } from '../../middleware/response/customCodes';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.render('login.ejs', {});
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};
