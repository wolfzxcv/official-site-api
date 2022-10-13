import { Locales } from './locales';

type DataCommonFormat = {
  id: number;
  title: string;
  content: string;
};

export interface DataInputFormat extends DataCommonFormat {
  lang: Locales;
  externalLink?: string;
  onTop?: string;
  createTime: Date;
  updateTime: Date;
  showTime: Date;
}

export interface DataOutputFormat extends DataCommonFormat {
  url?: string;
  onTop?: boolean;
  time: string;
}
