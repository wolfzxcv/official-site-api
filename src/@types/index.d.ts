export * from './checkIp';
export * from './contactInput';
export * from './customResponse';
export * from './locales';
export * from './news';
export * from './responseFormat';

import 'express-session';

declare global {
  namespace Express {
    export interface Request {
      flash(event: string, message: string): unknown;
    }
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

declare module 'express-flash' {
  export interface Flash {
    flash(type: string, message: string): void;
  }
}
