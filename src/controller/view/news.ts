import { NextFunction, Request, Response } from 'express';
import { params } from '../../config/params';
import { Log, News } from '../../config/typeorm/entities';
import { appDataSource } from '../../data-source';
import { customCodes } from '../../middleware/response/customCodes';
import {
  formatExpressIp,
  formatLangDisplay,
  formatTimestamp,
  formatXForwardedFor
} from '../../utils';

const newsRepository = appDataSource.getRepository(News);
const logRepository = appDataSource.getRepository(Log);

export const news = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newss = await newsRepository.find({
      order: {
        createTime: 'DESC'
      }
    });

    const output = newss.map(each => ({
      ...each,
      lang: formatLangDisplay(each.lang),

      createTime: formatTimestamp(each.createTime).replace(',', ''),
      updateTime: formatTimestamp(each.updateTime).replace(',', '')
    }));

    const clientIp =
      formatXForwardedFor(req.headers['x-forwarded-for'] as string) ||
      formatExpressIp(req.ip);

    if (req.session.user?.username && clientIp) {
      const newLog = {
        username: String(req.session.user?.username),
        event: `查看${params.news}`,
        ip: clientIp,
        time: new Date()
      };

      await logRepository.save(newLog);
    } else {
      new Error('error');
    }

    const perPage = params.pageSize;

    const totalPage = Math.ceil(newss.length / perPage);

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

    return res.render('news.ejs', {
      name: req.session.user?.username || params.defaultName,
      data,
      page,
      total: totalPage,
      pageUrl: 'news',
      ...params
    });
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};

export const newsCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.render('form.ejs', {
      method: params.create,
      page: params.news,
      submit: '/news/create',
      name: req.session.user?.username || params.defaultName,
      error: req.flash('error'),
      ...params
    });
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};

export const newsCreateFunction = async (
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

      await newsRepository.save(newInput);

      const clientIp =
        formatXForwardedFor(req.headers['x-forwarded-for'] as string) ||
        formatExpressIp(req.ip);

      if (req.session.user?.username && clientIp) {
        const newLog = {
          username: String(req.session.user?.username),
          event: `新增${params.news}:${title}`,
          ip: clientIp,
          time: new Date()
        };

        await logRepository.save(newLog);
      } else {
        new Error('error');
      }

      res.redirect('/news');
    } else {
      req.flash('error', '資料不完全');
      res.redirect('/news/create');
    }
  } catch (err) {
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};

export const newsUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    if (id) {
      const data = await newsRepository.findOne({
        where: {
          id
        }
      });

      return res.render('form.ejs', {
        method: params.edit,
        isPatch: true,
        page: params.news,
        submit: `/news/update/${id}`,
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

export const newsUpdateFunction = async (
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

      await newsRepository.update({ id }, updateInput);

      const clientIp =
        formatXForwardedFor(req.headers['x-forwarded-for'] as string) ||
        formatExpressIp(req.ip);

      if (req.session.user?.username && clientIp) {
        const newLog = {
          username: String(req.session.user?.username),
          event: `更新${params.news}:${title}`,
          ip: clientIp,
          time: new Date()
        };

        await logRepository.save(newLog);
      } else {
        new Error('error');
      }

      res.redirect('/news');
    } else {
      req.flash('error', '資料有錯誤');
      res.redirect(`/news/update/${id}`);
    }
  } catch (err) {
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};

export const newsDeleteFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    if (!!id) {
      await newsRepository.delete({ id });
      res.customResponse(customCodes.success, 'success', '刪除成功');

      req.flash('message', '刪除成功');
    }

    const clientIp =
      formatXForwardedFor(req.headers['x-forwarded-for'] as string) ||
      formatExpressIp(req.ip);

    if (req.session.user?.username && clientIp) {
      const newLog = {
        username: String(req.session.user?.username),
        event: `刪除${params.news} id:${id}`,
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
