import { NextFunction, Request, Response } from 'express';
import { ICustomResponse } from '../../@types';
import { checkInput } from '../../utils';
import { customCodes } from '../response/customCodes';

export const validatorPromotionInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, mobile } = req.body;

  const errors = {} as ICustomResponse['errors'];

  if (checkInput(name) !== 'valid') {
    errors.name = `Name is ${checkInput(name)}`;
  }

  if (checkInput(email) !== 'valid') {
    errors.email = `Email is ${checkInput(email)}`;
  }

  if (checkInput(mobile) !== 'valid') {
    errors.mobile = `mobile is ${checkInput(mobile)}`;
  }

  if (Object.keys(errors).length > 0) {
    return next(
      res.customResponse(customCodes.clientError, 'Bad request', null, errors)
    );
  }
  return next();
};
