import { NextFunction, Request, Response } from 'express';
import { IPromotion } from 'src/@types';
import { MLXYH } from '../../config/typeorm/entities';
import { appDataSource } from '../../data-source';
import { customCodes } from '../../middleware/response/customCodes';
import { sendMail } from '../../utils/sendMail';

export const mlxyh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newInput: IPromotion = {
      name: req.body.name,
      email: req.body.email,
      account: req.body.account,
      time: new Date()
    };

    // email content
    const data = [
      `姓名: ${newInput.name}`,
      `邮箱: ${newInput.email}`,
      `账户: ${newInput.account}`
    ];

    await sendMail(data, '[WCG国际站]推广活动落地页');

    const mlxyhRepository = appDataSource.getRepository(MLXYH);

    await mlxyhRepository.save(newInput);

    res.customResponse(customCodes.success, 'add data successfully');
  } catch (err) {
    next(next(res.customResponse(customCodes.serverError, 'error', null, err)));
  }
};
