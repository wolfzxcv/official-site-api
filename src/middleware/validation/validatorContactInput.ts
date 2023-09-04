import { NextFunction, Request, Response } from 'express';
import { ICustomResponse } from '../../@types';
import { checkInput } from '../../utils';
import { customCodes } from '../response/customCodes';

export const validatorContactInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, mobile, email } = req.body;

  const errors = {} as ICustomResponse['errors'];

  if (checkInput(firstName) !== 'valid') {
    errors.name = `First Name is ${checkInput(firstName)}`;
  }

  if (checkInput(lastName) !== 'valid') {
    errors.surname = `Last Name is ${checkInput(lastName)}`;
  }

  if (checkInput(mobile) !== 'valid') {
    errors.mobile = `mobile is ${checkInput(mobile)}`;
  }

  if (checkInput(email) !== 'valid') {
    errors.email = `Email is ${checkInput(email)}`;
  }

  if (Object.keys(errors).length > 0) {
    return next(
      res.customResponse(customCodes.clientError, 'Bad request', null, errors)
    );
  }
  return next();
};
