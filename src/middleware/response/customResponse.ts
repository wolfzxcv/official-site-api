import { response, Response } from 'express';
import { ICustomResponse, IResponseFormat } from '../../@types';

response.customResponse = function (
  httpStatusCode: ICustomResponse['httpStatusCode'],
  message: ICustomResponse['message'],
  data: ICustomResponse['data'] = null,
  errors: ICustomResponse['error'] = null
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

  if (errors) {
    res.error = errors;
  }

  return this.status(httpStatusCode).json(res);
};
