import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { ICheckIpRes, IIpApiRes } from '../../@types';

export const checkIp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ip = req.ip.split(':').pop();

    const result = await axios.get<IIpApiRes>(`http://ip-api.com/json/${ip}`);

    if (result && result.data) {
      const resultData = result.data;

      let output: ICheckIpRes = {
        ip: '',
        isShow: false
      };
      if (resultData.status === 'success') {
        output = {
          ip: resultData.query,
          isShow: resultData.countryCode === 'HK'
        };

        res.customResponse(200, 'success', output);
      } else {
        if (resultData.query) {
          output.ip = resultData.query;
        }

        res.customResponse(400, resultData.message || 'error', output);
      }
    } else {
      res.customResponse(500, 'error');
    }
  } catch (err) {
    next(res.customResponse(500, 'error', null, err));
  }
};
