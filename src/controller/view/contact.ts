import { NextFunction, Request, Response } from 'express';
import { params } from '../../config/params';
import { Contact } from '../../config/typeorm/entities';
import { appDataSource } from '../../data-source';
import { customCodes } from '../../middleware/response/customCodes';
import { formatTimestamp } from '../../utils';

export const contact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contactRepository = appDataSource.getRepository(Contact);
    const contacts = await contactRepository.find({
      order: {
        time: 'DESC'
      }
    });

    const data = contacts.map(each => ({
      ...each,
      time: formatTimestamp(each.time).replace(',', '')
    }));

    return res.render('contact.ejs', {
      data,
      name: req.session.user?.username || params.defaultName
    });
  } catch (err) {
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};
