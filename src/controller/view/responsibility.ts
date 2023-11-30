import { NextFunction, Request, Response } from 'express';
import { params } from '../../config/params';
import { Log, Responsibility } from '../../config/typeorm/entities';
import { appDataSource } from '../../data-source';
import { customCodes } from '../../middleware/response/customCodes';
import {
  formatExpressIp,
  formatLangDisplay,
  formatTimestamp,
  formatXForwardedFor
} from '../../utils';

const responsibilityRepository = appDataSource.getRepository(Responsibility);

const logRepository = appDataSource.getRepository(Log);

export const responsibility = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const responsibilities = await responsibilityRepository.find({
      order: {
        showTime: 'DESC',
        createTime: 'DESC'
      }
    });

    const output = responsibilities.map(each => ({
      ...each,
      lang: formatLangDisplay(each.lang),
      showTime: formatTimestamp(each.showTime).slice(0, 10),
      createTime: formatTimestamp(each.createTime).replace(',', ''),
      updateTime: formatTimestamp(each.updateTime).replace(',', '')
    }));

    const clientIp =
      formatXForwardedFor(req.headers['x-forwarded-for'] as string) ||
      formatExpressIp(req.ip as string);

    if (req.session.user?.username && clientIp) {
      const newLog = {
        username: String(req.session.user?.username),
        event: `查看${params.responsibility}`,
        ip: clientIp,
        time: new Date()
      };

      await logRepository.save(newLog);
    } else {
      new Error('error');
    }

    const perPage = params.pageSize;

    const totalPage = Math.ceil(responsibilities.length / perPage);

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

    return res.render('responsibility.ejs', {
      name: req.session.user?.username || params.defaultName,
      data,
      page,
      total: totalPage,
      pageUrl: 'responsibility',
      ...params
    });
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};

export const responsibilityCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.render('form.ejs', {
      method: params.create,
      page: params.responsibility,
      submit: '/responsibility/create',
      externalLink: true,
      name: req.session.user?.username || params.defaultName,
      error: req.flash('error'),
      ...params
    });
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};

export const responsibilityCreateFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lang, title, externalLink, time, content } = req.body;

    const dataIsValid = lang && title && time && content;

    if (!!dataIsValid) {
      const newInput = {
        lang,
        title,
        externalLink,
        showTime: time,
        content,
        createTime: new Date()
      };

      await responsibilityRepository.save(newInput);

      const clientIp =
        formatXForwardedFor(req.headers['x-forwarded-for'] as string) ||
        formatExpressIp(req.ip as string);

      if (req.session.user?.username && clientIp) {
        const newLog = {
          username: String(req.session.user?.username),
          event: `新增${params.responsibility}:${title}`,
          ip: clientIp,
          time: new Date()
        };

        await logRepository.save(newLog);
      } else {
        new Error('error');
      }
      res.redirect('/responsibility');
    } else {
      req.flash('error', '資料不完全');
      res.redirect('/responsibility/create');
    }
  } catch (err) {
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};

export const responsibilityUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    if (id) {
      const data = await responsibilityRepository.findOne({
        where: {
          id
        }
      });

      return res.render('form.ejs', {
        method: params.edit,
        isPatch: true,
        page: params.responsibility,
        submit: `/responsibility/update/${id}`,
        externalLink: true,
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

export const responsibilityUpdateFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const { lang, title, externalLink, time, content } = req.body;

    const dataIsValid = lang && title && time && content;

    if (id && !!dataIsValid) {
      const updateInput = {
        lang,
        title,
        externalLink,
        showTime: time,
        content,
        updateTime: new Date()
      };

      await responsibilityRepository.update({ id }, updateInput);

      const clientIp =
        formatXForwardedFor(req.headers['x-forwarded-for'] as string) ||
        formatExpressIp(req.ip as string);

      if (req.session.user?.username && clientIp) {
        const newLog = {
          username: String(req.session.user?.username),
          event: `更新${params.responsibility}:${title}`,
          ip: clientIp,
          time: new Date()
        };

        await logRepository.save(newLog);
      } else {
        new Error('error');
      }

      res.redirect('/responsibility');
    } else {
      req.flash('error', '資料有錯誤');
      res.redirect(`/responsibility/update/${id}`);
    }
  } catch (err) {
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};

export const responsibilityDeleteFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    if (!!id) {
      await responsibilityRepository.delete({ id });
      res.customResponse(customCodes.success, 'success', '刪除成功');

      req.flash('message', '刪除成功');
    }

    const clientIp =
      formatXForwardedFor(req.headers['x-forwarded-for'] as string) ||
      formatExpressIp(req.ip as string);

    if (req.session.user?.username && clientIp) {
      const newLog = {
        username: String(req.session.user?.username),
        event: `刪除${params.responsibility} id:${id}`,
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
