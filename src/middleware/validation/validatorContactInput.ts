import { NextFunction, Request, Response } from 'express';
import { ICustomResponse } from '../../@types';
import { customCodes } from '../response/customCodes';

export const validatorContactInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, surname, mobile, email, area, type, iScustomer } = req.body;

  const errors = {} as ICustomResponse['errors'];

  if (!name) {
    errors.name = 'name is required';
  }

  if (!surname) {
    errors.surname = 'surname is required';
  }

  if (!mobile) {
    errors.mobile = 'mobile is required';
  }

  if (!email) {
    errors.email = 'email is required';
  }

  if (!area) {
    errors.area = 'area is required';
  }

  if (!type) {
    errors.type = 'type is required';
  }

  if (!iScustomer) {
    errors.iScustomer = 'iScustomer is required';
  }

  if (Object.keys(errors).length > 0) {
    return next(
      res.customResponse(customCodes.clientError, 'Bad request', null, errors)
    );
  }
  return next();
};
