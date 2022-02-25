export * from './checkIp';
export * from './locales';
export * from './news';
export * from './responseFormat';

declare global {
  namespace Express {
    export interface Response {
      customResponse(
        httpStatusCode: number,
        message: string,
        data?: unknown,
        error?: unknown
      ): Response;
    }
  }
}
