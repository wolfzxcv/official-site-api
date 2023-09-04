import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { IDailyFxAsiaRes, INewsRes } from 'src/@types/news';
import { customCodes } from '../../middleware/response/customCodes';
import { formatTimestamp } from '../../utils';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await axios.get<IDailyFxAsiaRes[]>(
      'https://www.dailyfxasia.com/real-time-news/update-data'
    );

    if (result && result.data) {
      const resultData = result.data;

      const news: INewsRes[] = resultData.map(x => {
        const timestampToDate = new Date(x.createAt * 1000);

        const formatTime = formatTimestamp(timestampToDate).replace(',', '');

        return {
          id: x.id,
          createAt: x.createAt,
          text: x.text,
          time: formatTime.slice(5, 16) || ''
        };
      });

      res.customResponse(customCodes.success, 'success', news);
    } else {
      res.customResponse(customCodes.serverError, 'error');
    }
  } catch (err) {
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};
