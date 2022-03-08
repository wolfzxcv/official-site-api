import { NextFunction, Request, Response } from 'express';
import { ICustomResponse } from '../../@types';
import { checkInput } from '../../utils';
import { customCodes } from '../response/customCodes';

export const validatorContactInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, surname, mobile, email, area, type, iScustomer } = req.body;

  const errors = {} as ICustomResponse['errors'];

  if (checkInput(name) !== 'valid') {
    errors.name = `name is ${checkInput(name)}`;
  }

  if (checkInput(surname) !== 'valid') {
    errors.surname = `surname is ${checkInput(surname)}`;
  }

  if (checkInput(mobile) !== 'valid') {
    errors.mobile = `mobile is ${checkInput(mobile)}`;
  }

  if (checkInput(email) !== 'valid') {
    errors.email = `email is ${checkInput(email)}`;
  }

  if (checkInput(area) !== 'valid') {
    errors.area = `area is ${checkInput(area)}`;
  }

  if (checkInput(type) !== 'valid') {
    errors.type = `type is ${checkInput(type)}`;
  }

  if (checkInput(iScustomer) !== 'valid') {
    errors.iScustomer = `iScustomer is ${checkInput(iScustomer)}`;
  }

  if (Object.keys(errors).length > 0) {
    return next(
      res.customResponse(customCodes.clientError, 'Bad request', null, errors)
    );
  }
  return next();
};
