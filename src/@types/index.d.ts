export * from './checkIp';
export * from './news';
export * from './responseFormat';

declare global {
  namespace Express {
    export interface Response {
      customResponse(
        httpStatusCode: number,
        message: string,
        data?: any,
        error?: any
      ): Response;
    }
  }
}
