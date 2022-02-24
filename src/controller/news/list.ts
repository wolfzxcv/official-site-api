import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { IDailyFxAsiaRes, INewsRes } from '../../@types';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await axios.get<IDailyFxAsiaRes[]>(
      'https://www.dailyfxasia.com/real-time-news/update-data'
    );

    if (result && result.data) {
      const resultData = result.data;

      const news: INewsRes[] = resultData.map(x => ({
        author: x.author.twitter_nick || null,
        imageUrl: x.author.photo_url || null,
        id: x.id,
        createAt: x.createAt,
        text: x.text
      }));

      res.customResponse(200, 'success', news);
    } else {
      res.customResponse(500, 'error');
    }
  } catch (err) {
    next(res.customResponse(500, 'error', null, err));
  }
};
