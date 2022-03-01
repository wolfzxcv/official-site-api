export * from './checkIp';
export * from './contactInput';
export * from './customResponse';
export * from './locales';
export * from './news';
export * from './responseFormat';

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
