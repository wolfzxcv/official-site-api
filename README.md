# API 文件

## 0.共用 response 格式

```typescript=
export type IResponseFormat = {
  status: number;
  message: string;
  code: 1 | 0;
  data?: any;
  error?: any;
};
```

- 語言代號,[依照 ISO 碼命名](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes),**所有 API 皆須在 URL 上帶語系**參數,**lang=(要帶的語系)**
  cn = 簡體中文
  zh = 繁體中文
  en = 英語
  vi = 越南語
  ms = 馬來語
  id = 印尼語
  ar = 阿拉伯語

- 因應"後台"增加日期選擇器, 前台 API 日期顯示規則更新.

  - ![](https://i.imgur.com/WFZei2D.jpg)
  - 如果 API 有回傳日期選擇器時間,則優先顯示
  - 若無,則回傳文章插入時間
  - time = 文章插入時間, showTime = 日期選擇器時間

## 1.市場分析

| Item   | Value          |
| ------ | -------------- |
| Method | GET            |
| path   | **/quotation** |
| param  | lang           |

## 2.財經新聞

| Item   | Value      |
| ------ | ---------- |
| Method | GET        |
| path   | **/focus** |
| param  | lang       |

## 3.企業責任

| Item   | Value         |
| ------ | ------------- |
| Method | GET           |
| path   | **/response** |
| param  | lang          |

## 4.平台公告

| Item   | Value       |
| ------ | ----------- |
| Method | GET         |
| path   | **/notice** |
| param  | lang        |

## 5.偵測是否為香港 IP

| Item   | Value        |
| ------ | ------------ |
| Method | GET          |
| path   | **/checkip** |
| param  |              |

```typescript=
export type ICheckIpRes = {
  ip: string;
  isShow: boolean;
};
```

## 6.取得即時新聞

| Item   | Value     |
| ------ | --------- |
| Method | GET       |
| path   | **/news** |
| param  |           |

```typescript=
export type INewsRes = {
  author: string | null;
  imageUrl: string | null;
  id: string;
  createAt: number;
  text: string;
};
```
