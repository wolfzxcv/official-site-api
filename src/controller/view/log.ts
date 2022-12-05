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

    const output = logs.map(each => ({
      ...each,
      time: formatTimestamp(each.time).replace(',', '')
    }));

    const perPage = params.pageSize;

    const totalPage = Math.ceil(logs.length / perPage);

    let page = Number(req.query.page);

    if (!!page) {
      if (page > totalPage) {
        // last page
        page = totalPage;
      } else if (page < 1) {
        // first page
        page = 1;
      }
    } else {
      // first page
      page = 1;
    }

    // index starts from 0, so we should - 1
    const data = output.slice(perPage * (page - 1), perPage * page);

    return res.render('log.ejs', {
      name: req.session.user?.username || params.defaultName,
      data,
      page,
      total: totalPage,
      pageUrl: 'log',
      ...params
    });
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};
