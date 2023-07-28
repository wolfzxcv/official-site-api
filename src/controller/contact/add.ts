import { NextFunction, Request, Response } from 'express';
import { IContactInput } from '../../@types';
import { Contact } from '../../config/typeorm/entities/Contact';
import { appDataSource } from '../../data-source';
import { customCodes } from '../../middleware/response/customCodes';

export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newInput: IContactInput = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mobile: req.body.mobile,
      email: req.body.email,
      content: req.body.content,
      time: new Date()
    };

    const contactRepository = appDataSource.getRepository(Contact);

    await contactRepository.save(newInput);

    res.customResponse(customCodes.success, 'add contact successfully');
  } catch (err) {
    next(next(res.customResponse(customCodes.serverError, 'error', null, err)));
  }
};
