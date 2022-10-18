import { NextFunction, Request, Response } from 'express';
import { NoticeG, NoticeM } from '../../config/typeorm/entities';
import { appDataSource } from '../../data-source';
import { customCodes } from '../../middleware/response/customCodes';
import { formatTimestamp } from '../../utils';

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
      showTime: formatTimestamp(each.showTime).slice(0, 10),
      createTime: formatTimestamp(each.createTime).replace(',', ''),
      updateTime: formatTimestamp(each.updateTime).replace(',', '')
    }));

    let siteName = '';

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
      name: req.session.user?.username || 'Guest?',
      siteName
    });
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};
