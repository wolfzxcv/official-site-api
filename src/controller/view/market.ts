import { NextFunction, Request, Response } from 'express';
import { params } from '../../config/params';
import { Market } from '../../config/typeorm/entities';
import { appDataSource } from '../../data-source';
import { customCodes } from '../../middleware/response/customCodes';
import { formatLangDisplay, formatTimestamp } from '../../utils';

export const market = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const marketRepository = appDataSource.getRepository(Market);
    const markets = await marketRepository.find({
      order: {
        showTime: 'DESC',
        createTime: 'DESC'
      }
    });

    const data = markets.map(each => ({
      ...each,
      lang: formatLangDisplay(each.lang),
      showTime: formatTimestamp(each.showTime).slice(0, 10),
      createTime: formatTimestamp(each.createTime).replace(',', ''),
      updateTime: formatTimestamp(each.updateTime).replace(',', '')
    }));

    return res.render('market.ejs', {
      data,
      name: req.session.user?.username || params.defaultName,
      ...params
    });
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};

export const marketCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.render('form.ejs', {
      method: params.create,
      page: params.market,
      name: req.session.user?.username || params.defaultName,
      ...params
    });
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};
