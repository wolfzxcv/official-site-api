import { NextFunction, Request, Response } from 'express';
import { params } from '../../config/params';
import { Log, Market } from '../../config/typeorm/entities';
import { appDataSource } from '../../data-source';
import { customCodes } from '../../middleware/response/customCodes';
import {
  formatExpressIp,
  formatLangDisplay,
  formatTimestamp,
  formatXForwardedFor
} from '../../utils';

const marketRepository = appDataSource.getRepository(Market);
const logRepository = appDataSource.getRepository(Log);

export const market = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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

    const clientIp =
      formatXForwardedFor(req.headers['x-forwarded-for'] as string) ||
      formatExpressIp(req.ip);

    if (req.session.user?.username && clientIp) {
      const newLog = {
        username: String(req.session.user?.username),
        event: `查看${params.market}`,
        ip: clientIp,
        time: new Date()
      };

      await logRepository.save(newLog);
    } else {
      new Error('error');
    }

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
      submit: '/market/create',
      name: req.session.user?.username || params.defaultName,
      error: req.flash('error'),
      ...params
    });
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};

export const marketCreateFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lang, title, time, content } = req.body;

    const dataIsValid = lang && title && time && content;

    if (!!dataIsValid) {
      const newInput = {
        lang,
        title,
        showTime: time,
        content,
        createTime: new Date()
      };

      await marketRepository.save(newInput);

      const clientIp =
        formatXForwardedFor(req.headers['x-forwarded-for'] as string) ||
        formatExpressIp(req.ip);

      if (req.session.user?.username && clientIp) {
        const newLog = {
          username: String(req.session.user?.username),
          event: `新增${params.market}:${title}`,
          ip: clientIp,
          time: new Date()
        };

        await logRepository.save(newLog);
      } else {
        new Error('error');
      }

      res.redirect('/market');
    } else {
      req.flash('error', '資料不完全');
      res.redirect('/market/create');
    }
  } catch (err) {
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};

export const marketUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    if (id) {
      const data = await marketRepository.findOne({
        where: {
          id
        }
      });

      return res.render('form.ejs', {
        method: params.edit,
        isPatch: true,
        page: params.market,
        submit: `/market/update/${id}`,
        name: req.session.user?.username || params.defaultName,
        data,
        error: req.flash('error'),
        ...params
      });
    } else {
      throw new Error('error');
    }
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};

export const marketUpdateFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const { lang, title, time, content } = req.body;

    const dataIsValid = lang && title && time && content;

    if (id && !!dataIsValid) {
      const updateInput = {
        lang,
        title,
        showTime: time,
        content,
        updateTime: new Date()
      };

      await marketRepository.update({ id }, updateInput);

      const clientIp =
        formatXForwardedFor(req.headers['x-forwarded-for'] as string) ||
        formatExpressIp(req.ip);

      if (req.session.user?.username && clientIp) {
        const newLog = {
          username: String(req.session.user?.username),
          event: `更新${params.market}:${title}`,
          ip: clientIp,
          time: new Date()
        };

        await logRepository.save(newLog);
      } else {
        new Error('error');
      }

      res.redirect('/market');
    } else {
      req.flash('error', '資料有錯誤');
      res.redirect(`/market/update/${id}`);
    }
  } catch (err) {
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};

export const marketDeleteFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    if (!!id) {
      await marketRepository.delete({ id });
      res.customResponse(customCodes.success, 'success', '刪除成功');

      req.flash('message', '刪除成功');
    }

    const clientIp =
      formatXForwardedFor(req.headers['x-forwarded-for'] as string) ||
      formatExpressIp(req.ip);

    if (req.session.user?.username && clientIp) {
      const newLog = {
        username: String(req.session.user?.username),
        event: `刪除${params.market} id:${id}`,
        ip: clientIp,
        time: new Date()
      };

      await logRepository.save(newLog);
    } else {
      new Error('error');
    }
  } catch (err) {
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};
