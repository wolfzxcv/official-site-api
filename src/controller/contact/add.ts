import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { IContactInput } from '../../@types';
import { customCodes } from '../../middleware/response/customCodes';
import { checkContactInput } from '../../middleware/validation/checkContactInput';
import { Contact } from '../../orm/entities/Contact';

export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validInput = checkContactInput(req.body);
    if (!!validInput) {
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

      const contactRepository = getRepository(Contact);

      await contactRepository.save(newInput);

      res.customResponse(customCodes.success, 'add contact successfully');
    } else {
      res.customResponse(
        customCodes.clientError,
        'Bad request, please check whether input is correct'
      );
    }
  } catch (err) {
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};
