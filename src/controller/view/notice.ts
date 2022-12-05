import { NextFunction, Request, Response } from 'express';
import { params } from '../../config/params';
import { Log, NoticeG, NoticeM } from '../../config/typeorm/entities';
import { appDataSource } from '../../data-source';
import { customCodes } from '../../middleware/response/customCodes';
import {
  formatExpressIp,
  formatLangDisplay,
  formatTimestamp,
  formatXForwardedFor
} from '../../utils';

let noticeRepository = appDataSource.getRepository(NoticeG);
const logRepository = appDataSource.getRepository(Log);

export const notice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const site = req.params.site;

    switch (site) {
      case 'm':
        noticeRepository = appDataSource.getRepository(NoticeM);
        break;
      default:
        noticeRepository = appDataSource.getRepository(NoticeG);
        break;
    }

    const notices = await noticeRepository.find({
      order: {
        showTime: 'DESC',
        createTime: 'DESC'
      }
    });

    const output = notices.map(each => ({
      ...each,
      lang: formatLangDisplay(each.lang),
      showTime: formatTimestamp(each.showTime).slice(0, 10),
      createTime: formatTimestamp(each.createTime).replace(',', ''),
      updateTime: formatTimestamp(each.updateTime).replace(',', '')
    }));

    let siteName = '';

    switch (site) {
      case 'g':
        siteName = '國際';
        break;
      case 'm':
        siteName = '金業';
        break;
      default:
        break;
    }

    const clientIp =
      formatXForwardedFor(req.headers['x-forwarded-for'] as string) ||
      formatExpressIp(req.ip);

    if (req.session.user?.username && clientIp) {
      const newLog = {
        username: String(req.session.user?.username),
        event: `查看${params.notice}(${siteName})`,
        ip: clientIp,
        time: new Date()
      };

      await logRepository.save(newLog);
    } else {
      new Error('error');
    }

    const perPage = params.pageSize;

    const totalPage = Math.ceil(notices.length / perPage);

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

    return res.render('notice.ejs', {
      name: req.session.user?.username || params.defaultName,
      data,
      page,
      total: totalPage,
      pageUrl: `notice/${site}`,
      siteName,
      site,
      ...params
    });
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};

export const noticeCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const site = req.params.site;

    let siteName = '';

    switch (site) {
      case 'g':
        siteName = '國際';
        break;
      case 'm':
        siteName = '金業';
        break;
      default:
        break;
    }
    return res.render('form.ejs', {
      method: params.create,
      page: `${params.notice}(${siteName})`,
      submit: `/notice/${site}/create`,
      onTop: true,
      name: req.session.user?.username || params.defaultName,
      error: req.flash('error'),
      ...params
    });
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};

export const noticeCreateFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const site = req.params.site;

    switch (site) {
      case 'm':
        noticeRepository = appDataSource.getRepository(NoticeM);
        break;
      default:
        noticeRepository = appDataSource.getRepository(NoticeG);
        break;
    }

    let siteName = '';

    switch (site) {
      case 'g':
        siteName = '國際';
        break;
      case 'm':
        siteName = '金業';
        break;
      default:
        break;
    }

    const { lang, title, onTop, time, content } = req.body;

    const dataIsValid = lang && title && time && content;

    if (!!dataIsValid) {
      const newInput = {
        lang,
        title,
        onTop: !!onTop ? '1' : '0',
        showTime: time,
        content,
        createTime: new Date()
      };

      await noticeRepository.save(newInput);

      const clientIp =
        formatXForwardedFor(req.headers['x-forwarded-for'] as string) ||
        formatExpressIp(req.ip);

      if (req.session.user?.username && clientIp) {
        const newLog = {
          username: String(req.session.user?.username),
          event: `新增${params.notice}(${siteName}):${title}`,
          ip: clientIp,
          time: new Date()
        };

        await logRepository.save(newLog);
      } else {
        new Error('error');
      }

      res.redirect(`/notice/${site}`);
    } else {
      req.flash('error', '資料不完全');
      res.redirect(`/notice/${site}/create`);
    }
  } catch (err) {
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};

export const noticeUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const site = req.params.site;
    const id = Number(req.params.id);

    switch (site) {
      case 'm':
        noticeRepository = appDataSource.getRepository(NoticeM);
        break;
      default:
        noticeRepository = appDataSource.getRepository(NoticeG);
        break;
    }

    if (id) {
      const data = await noticeRepository.findOne({
        where: {
          id
        }
      });

      let siteName = '';

      switch (site) {
        case 'g':
          siteName = '國際';
          break;
        case 'm':
          siteName = '金業';
          break;
        default:
          break;
      }

      return res.render('form.ejs', {
        method: params.edit,
        isPatch: true,
        page: `${params.notice}(${siteName})`,
        submit: `/notice/${site}/update/${id}`,
        onTop: true,
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

export const noticeUpdateFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const site = req.params.site;
    const id = Number(req.params.id);

    switch (site) {
      case 'm':
        noticeRepository = appDataSource.getRepository(NoticeM);
        break;
      default:
        noticeRepository = appDataSource.getRepository(NoticeG);
        break;
    }

    const { lang, title, onTop, time, content } = req.body;

    const dataIsValid = lang && title && time && content;

    if (id && !!dataIsValid) {
      const updateInput = {
        lang,
        title,
        onTop: !!onTop ? '1' : '0',
        showTime: time,
        content,
        updateTime: new Date()
      };

      await noticeRepository.update({ id }, updateInput);

      let siteName = '';

      switch (site) {
        case 'g':
          siteName = '國際';
          break;
        case 'm':
          siteName = '金業';
          break;
        default:
          break;
      }

      const clientIp =
        formatXForwardedFor(req.headers['x-forwarded-for'] as string) ||
        formatExpressIp(req.ip);

      if (req.session.user?.username && clientIp) {
        const newLog = {
          username: String(req.session.user?.username),
          event: `更新${params.notice}(${siteName}):${title}`,
          ip: clientIp,
          time: new Date()
        };

        await logRepository.save(newLog);
      } else {
        new Error('error');
      }

      res.redirect(`/notice/${site}`);
    } else {
      req.flash('error', '資料有錯誤');
      res.redirect(`/notice/${site}/update/${id}`);
    }
  } catch (err) {
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};

export const noticeDeleteFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const site = req.params.site;
    const id = Number(req.params.id);

    switch (site) {
      case 'm':
        noticeRepository = appDataSource.getRepository(NoticeM);
        break;
      default:
        noticeRepository = appDataSource.getRepository(NoticeG);
        break;
    }

    if (!!id) {
      await noticeRepository.delete({ id });
      res.customResponse(customCodes.success, 'success', '刪除成功');

      req.flash('message', '刪除成功');
    }

    let siteName = '';

    switch (site) {
      case 'g':
        siteName = '國際';
        break;
      case 'm':
        siteName = '金業';
        break;
      default:
        break;
    }

    const clientIp =
      formatXForwardedFor(req.headers['x-forwarded-for'] as string) ||
      formatExpressIp(req.ip);

    if (req.session.user?.username && clientIp) {
      const newLog = {
        username: String(req.session.user?.username),
        event: `刪除${params.notice}(${siteName}) id:${id}`,
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
