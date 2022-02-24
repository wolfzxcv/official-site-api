export type IResponseFormat = {
  status: number;
  message: string;
  code: 1 | 0;
  data?: any;
  error?: any;
};
