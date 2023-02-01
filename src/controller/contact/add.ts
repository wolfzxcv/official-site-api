import { NextFunction, Request, Response } from 'express';
import { IContactInput } from '../../@types';
import { Contact } from '../../config/typeorm/entities/Contact';
import { appDataSource } from '../../data-source';
import { customCodes } from '../../middleware/response/customCodes';
import { sendMail } from '../../utils/sendMail';

export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newInput: IContactInput = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mobile: req.body.mobile,
      email: req.body.email,
      area: req.body.area,
      type: req.body.type,
      account: req.body.account,
      content: req.body.content,
      time: new Date()
    };

    // email content
    const data = [
      `name: ${newInput.firstName} ${newInput.lastName}`,
      `tel: ${newInput.mobile}`,
      `email: ${newInput.email}`,
      `area: ${newInput.area}`,
      `type: ${newInput.type}`
    ];

    if (newInput.account) {
      data.push(`account: ${newInput.account}`);
    }

    if (newInput.content) {
      data.push(`message: ${newInput.content}`);
    }

    await sendMail(data, '[WCG國際站]客戶填寫諮詢表單');

    const contactRepository = appDataSource.getRepository(Contact);

    await contactRepository.save(newInput);

    res.customResponse(customCodes.success, 'add contact successfully');
  } catch (err) {
    next(next(res.customResponse(customCodes.serverError, 'error', null, err)));
  }
};
