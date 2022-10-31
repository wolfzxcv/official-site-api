import { NextFunction, Request, Response } from 'express';
import { params } from '../../config/params';
import { Responsibility } from '../../config/typeorm/entities';
import { appDataSource } from '../../data-source';
import { customCodes } from '../../middleware/response/customCodes';
import { formatTimestamp } from '../../utils';

export const responsibility = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const responsibilityRepository =
      appDataSource.getRepository(Responsibility);
    const responsibilities = await responsibilityRepository.find({
      order: {
        showTime: 'DESC',
        createTime: 'DESC'
      }
    });

    const data = responsibilities.map(each => ({
      ...each,
      showTime: formatTimestamp(each.showTime).slice(0, 10),
      createTime: formatTimestamp(each.createTime).replace(',', ''),
      updateTime: formatTimestamp(each.updateTime).replace(',', '')
    }));

    return res.render('responsibility.ejs', {
      data,
      name: req.session.user?.username || params.defaultName
    });
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};
