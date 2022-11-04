import { NextFunction, Request, Response } from 'express';
import { params } from '../../config/params';
import { Log } from '../../config/typeorm/entities';
import { appDataSource } from '../../data-source';
import { customCodes } from '../../middleware/response/customCodes';
import { formatTimestamp } from '../../utils';

export const log = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const logRepository = appDataSource.getRepository(Log);
    const logs = await logRepository.find({
      order: {
        time: 'DESC'
      }
    });

    const data = logs.map(each => ({
      ...each,
      time: formatTimestamp(each.time).replace(',', '')
    }));

    return res.render('log.ejs', {
      name: req.session.user?.username || params.defaultName,
      data,
      ...params
    });
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};
