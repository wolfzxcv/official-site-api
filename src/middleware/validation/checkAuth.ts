import { NextFunction, Request, Response } from 'express';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    return next();
  } else {
    return res.redirect('/');
  }
};

export const checkNotAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.user) {
    return res.redirect('/notice/g');
  } else {
    return next();
  }
};
