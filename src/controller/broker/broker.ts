import { NextFunction, Request, Response } from 'express';
import { IPromotion } from 'src/@types';
import { Broker } from '../../config/typeorm/entities/';
import { appDataSource } from '../../data-source';
import { customCodes } from '../../middleware/response/customCodes';
import { sendMail } from '../../utils/sendMail';

export const broker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newInput: IPromotion = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      qq: req.body.qq,
      time: new Date()
    };

    // email content
    const data = [
      `姓名: ${newInput.name}`,
      `电邮: ${newInput.email}`,
      `手机号: ${newInput.mobile}`,
      `微信或QQ: ${newInput.qq || ''}`
    ];

    await sendMail(data, '[WCG金业站]成为代理');

    const brokerRepository = appDataSource.getRepository(Broker);

    await brokerRepository.save(newInput);

    res.customResponse(customCodes.success, 'add data successfully');
  } catch (err) {
    next(next(res.customResponse(customCodes.serverError, 'error', null, err)));
  }
};
