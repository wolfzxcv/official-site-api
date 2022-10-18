import { NextFunction, Request, Response } from 'express';
import { customCodes } from '../../middleware/response/customCodes';

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.session.destroy(err => console.log(err));
    res.redirect('/');
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};
