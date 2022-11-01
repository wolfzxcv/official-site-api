import { NextFunction, Request, Response } from 'express';
import { params } from '../../config/params';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    return next();
  } else {
    return res.redirect(params.home);
  }
};

export const checkNotAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.user) {
    return res.redirect(params.pageAfterLogin);
  } else {
    return next();
  }
};
