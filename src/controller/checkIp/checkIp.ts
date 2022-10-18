import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { ICheckIpRes, IIpApiRes } from '../../@types';
import { customCodes } from '../../middleware/response/customCodes';
import { formatExpressIp, formatXForwardedFor } from '../../utils/format';

export const checkIp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clientIp =
      formatXForwardedFor(req.headers['x-forwarded-for'] as string) ||
      formatExpressIp(req.ip);

    const result = await axios.get<IIpApiRes>(
      `http://ip-api.com/json/${clientIp}`
    );

    if (result && result.data) {
      const resultData = result.data;

      let output = {} as ICheckIpRes;
      if (resultData.status === 'success') {
        output = {
          ip: resultData.query,
          location: resultData.countryCode
        };

        res.customResponse(customCodes.success, 'success', output);
      } else {
        if (resultData.query) {
          output.ip = resultData.query;
        }

        res.customResponse(
          customCodes.clientError,
          resultData.message || 'error',
          output
        );
      }
    } else {
      res.customResponse(customCodes.serverError, 'error');
    }
  } catch (err) {
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};
