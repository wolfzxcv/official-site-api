import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { IContactInput } from '../../@types';
import { customCodes } from '../../middleware/response/customCodes';
import { Contact } from '../../orm/entities/Contact';
import { sendMail } from '../../utils/sendMail';

export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newInput: IContactInput = {
      name: req.body.name,
      surname: req.body.surname,
      mobile: req.body.mobile,
      email: req.body.email,
      area: req.body.area,
      type: req.body.type,
      iScustomer: req.body.iScustomer,
      login: req.body.login,
      content: req.body.content,
      time: new Date()
    };

    await sendMail(newInput);

    const contactRepository = getRepository(Contact);

    await contactRepository.save(newInput);

    res.customResponse(customCodes.success, 'add contact successfully');
  } catch (err) {
    next(next(res.customResponse(customCodes.serverError, 'error', null, err)));
  }
};
