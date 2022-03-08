import { NextFunction, Request, Response } from 'express';
import { formatExpressIp, logMessage } from '../utils';

export const appLogger = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const message = `${req.method} ${req.originalUrl} from ${formatExpressIp(
    req.ip
  )} `;
  logMessage(message, 'error');

  return next();
};
