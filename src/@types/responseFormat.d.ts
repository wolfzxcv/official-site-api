export type IResponseFormat = {
  status: number;
  message: string;
  code: 1 | 0;
  data?: unknown;
  error?: unknown;
};
