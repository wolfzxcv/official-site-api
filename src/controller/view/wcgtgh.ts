import { NextFunction, Request, Response } from 'express';
import { params } from '../../config/params';
import { Log, WCGTGH } from '../../config/typeorm/entities';
import { appDataSource } from '../../data-source';
import { customCodes } from '../../middleware/response/customCodes';
import {
  formatExpressIp,
  formatTimestamp,
  formatXForwardedFor
} from '../../utils';

export const wcgtgh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const wcgtghRepository = appDataSource.getRepository(WCGTGH);
    const items = await wcgtghRepository.find({
      order: {
        time: 'DESC'
      }
    });

    const output = items.map(each => ({
      ...each,
      time: formatTimestamp(each.time).replace(',', '')
    }));

    const logRepository = appDataSource.getRepository(Log);

    const clientIp =
      formatXForwardedFor(req.headers['x-forwarded-for'] as string) ||
      formatExpressIp(req.ip as string);

    if (req.session.user?.username && clientIp) {
      const newLog = {
        username: String(req.session.user?.username),
        event: `查看WCGTGH`,
        ip: clientIp,
        time: new Date()
      };

      await logRepository.save(newLog);
    } else {
      new Error('error');
    }

    const perPage = params.pageSize;

    const totalPage = Math.ceil(items.length / perPage);

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

    return res.render('wcgtgh.ejs', {
      name: req.session.user?.username || params.defaultName,
      data,
      page,
      total: totalPage,
      pageUrl: 'wcgtgh',
      ...params
    });
  } catch (err) {
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};
