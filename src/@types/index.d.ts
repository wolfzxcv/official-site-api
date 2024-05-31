export * from './checkIp';
export * from './contactInput';
export * from './customResponse';
export * from './locales';
export * from './promotion';
export * from './responseFormat';

import 'express-session';

declare global {
  namespace Express {
    export interface Response {
      customResponse(
        httpStatusCode: ICustomResponse['httpStatusCode'],
        message: ICustomResponse['message'],
        data?: ICustomResponse['data'],
        error?: ICustomResponse['error']
      ): Response;
    }
  }
}

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: string | number | Date };
    captcha: string;
  }
}
