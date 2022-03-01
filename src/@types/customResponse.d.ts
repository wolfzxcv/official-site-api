export type ICustomResponse = {
  httpStatusCode: number;
  message: string;
  data: unknown;
  error: unknown;
  errors: { [key: string]: string };
};
