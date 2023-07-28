import { NextFunction, Request, Response } from 'express';
import { params } from '../../config/params';
import { Announcement, Log } from '../../config/typeorm/entities';
import { appDataSource } from '../../data-source';
import { customCodes } from '../../middleware/response/customCodes';
import {
  formatExpressIp,
  formatLangDisplay,
  formatTimestamp,
  formatXForwardedFor
} from '../../utils';

const announcementRepository = appDataSource.getRepository(Announcement);
const logRepository = appDataSource.getRepository(Log);

export const announcement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const announcements = await announcementRepository.find({
      order: {
        createTime: 'DESC'
      }
    });

    const output = announcements.map(each => ({
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
        event: `查看${params.announcement}`,
        ip: clientIp,
        time: new Date()
      };

      await logRepository.save(newLog);
    } else {
      new Error('error');
    }

    const perPage = params.pageSize;

    const totalPage = Math.ceil(announcements.length / perPage);

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

    return res.render('announcement.ejs', {
      name: req.session.user?.username || params.defaultName,
      data,
      page,
      total: totalPage,
      pageUrl: 'announcement',
      ...params
    });
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};

export const announcementCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.render('form.ejs', {
      method: params.create,
      page: params.announcement,
      submit: '/announcement/create',
      name: req.session.user?.username || params.defaultName,
      error: req.flash('error'),
      ...params
    });
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};

export const announcementCreateFunction = async (
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

      await announcementRepository.save(newInput);

      const clientIp =
        formatXForwardedFor(req.headers['x-forwarded-for'] as string) ||
        formatExpressIp(req.ip);

      if (req.session.user?.username && clientIp) {
        const newLog = {
          username: String(req.session.user?.username),
          event: `新增${params.announcement}:${title}`,
          ip: clientIp,
          time: new Date()
        };

        await logRepository.save(newLog);
      } else {
        new Error('error');
      }

      res.redirect('/announcement');
    } else {
      req.flash('error', '資料不完全');
      res.redirect('/announcement/create');
    }
  } catch (err) {
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};

export const announcementUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    if (id) {
      const data = await announcementRepository.findOne({
        where: {
          id
        }
      });

      return res.render('form.ejs', {
        method: params.edit,
        isPatch: true,
        page: params.announcement,
        submit: `/announcement/update/${id}`,
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

export const announcementUpdateFunction = async (
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

      await announcementRepository.update({ id }, updateInput);

      const clientIp =
        formatXForwardedFor(req.headers['x-forwarded-for'] as string) ||
        formatExpressIp(req.ip);

      if (req.session.user?.username && clientIp) {
        const newLog = {
          username: String(req.session.user?.username),
          event: `更新${params.announcement}:${title}`,
          ip: clientIp,
          time: new Date()
        };

        await logRepository.save(newLog);
      } else {
        new Error('error');
      }

      res.redirect('/announcement');
    } else {
      req.flash('error', '資料有錯誤');
      res.redirect(`/announcement/update/${id}`);
    }
  } catch (err) {
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};

export const announcementDeleteFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    if (!!id) {
      await announcementRepository.delete({ id });
      res.customResponse(customCodes.success, 'success', '刪除成功');

      req.flash('message', '刪除成功');
    }

    const clientIp =
      formatXForwardedFor(req.headers['x-forwarded-for'] as string) ||
      formatExpressIp(req.ip);

    if (req.session.user?.username && clientIp) {
      const newLog = {
        username: String(req.session.user?.username),
        event: `刪除${params.announcement} id:${id}`,
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
