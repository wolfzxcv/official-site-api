import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { IDailyFxAsiaRes, INewsRes } from '../../@types';
import { customCodes } from '../../middleware/response/customCodes';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await axios.get<IDailyFxAsiaRes[]>(
      'https://www.dailyfxasia.com/real-time-news/update-data'
    );

    if (result && result.data) {
      const resultData = result.data;

      const news: INewsRes[] = resultData.map(x => ({
        imageUrl: x.author.photo_url || null,
        id: x.id,
        createAt: x.createAt,
        text: x.text
      }));

      res.customResponse(customCodes.success, 'success', news);
    } else {
      res.customResponse(customCodes.serverError, 'error');
    }
  } catch (err) {
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};
