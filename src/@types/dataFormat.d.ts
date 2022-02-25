type DataCommonFormat = {
  id: number;
  title: string;
  content: string;
};

export interface DataInputFormat extends DataCommonFormat {
  lang: number;
  path?: string;
  out_url?: string;
  abstract: string;
  time: Date;
  showTime: Date;
}

export interface DataOutputFormat extends DataCommonFormat {
  url?: string;
  displayTime: string;
}
