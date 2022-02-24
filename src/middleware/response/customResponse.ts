import { response, Response } from 'express';
import { IResponseFormat } from '../../@types';

response.customResponse = function (
  httpStatusCode: number,
  message: string,
  data: any = null,
  errorRaw: any = null
): Response {
  const res: IResponseFormat = {
    status: httpStatusCode,
    code: httpStatusCode === 200 ? 1 : 0,
    message
  };

  const validData = data && (typeof data === 'object' || Array.isArray(data));

  if (validData) {
    res.data = data;
  }

  if (errorRaw) {
    res.error = errorRaw;
  }
  return this.status(httpStatusCode).json(res);
};
