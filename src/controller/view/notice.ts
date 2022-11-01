import { NextFunction, Request, Response } from 'express';
import { params } from '../../config/params';
import { NoticeG, NoticeM } from '../../config/typeorm/entities';
import { appDataSource } from '../../data-source';
import { customCodes } from '../../middleware/response/customCodes';
import { formatLangDisplay, formatTimestamp } from '../../utils';

export const notice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let noticeRepository = appDataSource.getRepository(NoticeG);

    switch (req.params.id) {
      case 'm':
        noticeRepository = appDataSource.getRepository(NoticeM);
        break;
      default:
        break;
    }

    const notices = await noticeRepository.find({
      order: {
        showTime: 'DESC',
        createTime: 'DESC'
      }
    });

    const data = notices.map(each => ({
      ...each,
      lang: formatLangDisplay(each.lang),
      showTime: formatTimestamp(each.showTime).slice(0, 10),
      createTime: formatTimestamp(each.createTime).replace(',', ''),
      updateTime: formatTimestamp(each.updateTime).replace(',', '')
    }));

    let siteName = '';
    const site = req.params.id;

    switch (req.params.id) {
      case 'g':
        siteName = '國際';
        break;
      case 'm':
        siteName = '金業';
        break;
      default:
        break;
    }

    return res.render('notice.ejs', {
      data,
      name: req.session.user?.username || params.defaultName,
      siteName,
      site,
      ...params
    });
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};
