# API 文件

## 0.共用 response 格式

```typescript=
type IResponseFormat = {
  status: number;
  message: string;
  code: 1 | 0;
  data?: any;
  error?: any;
};
```

- 語言代號,[依照 ISO 碼命名](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes), API 參數 **lang** 為要請求的 **語系**
  cn = 簡體中文
  zh = 繁體中文
  en = 英語
  vi = 越南語
  ms = 馬來語
  id = 印尼語
  ar = 阿拉伯語

- 因應"後台"增加日期選擇器, API 回傳 displayTime 規則更新.

  - 如果該筆資料, 有 showTime,則回傳 showTime
  - 若無,則回傳 time
  - time = 文章插入時間, showTime = 日期選擇器時間

```typescript=
type DataOutputFormat = {
  id: number;
  title: string;
  content: string;
  url?: string;  // 目前僅有 企業責任 可能有這個參數
  displayTime: string;
};
```

## 1.市場分析

| Item   | Value          |
| ------ | -------------- |
| Method | GET            |
| path   | **/quotation** |
| param  | lang           |
| table  | d_quotation    |

## 2.財經新聞

| Item   | Value      |
| ------ | ---------- |
| Method | GET        |
| path   | **/focus** |
| param  | lang       |
| table  | d_focus    |

## 3.企業責任

| Item   | Value         |
| ------ | ------------- |
| Method | GET           |
| path   | **/response** |
| param  | lang          |
| table  | d_response    |

## 4.平台公告

| Item   | Value       |
| ------ | ----------- |
| Method | GET         |
| path   | **/notice** |
| param  | lang        |
| table  | d_notice    |

## 5.聯繫我們

| Item   | Value        |
| ------ | ------------ |
| Method | POST         |
| path   | **/contact** |
| param  |              |
| table  | d_contact    |

```typescript=
type IContactInput = {
  name: string;
  surname: string;
  mobile: string;
  email: string;
  area: string;
  type: string;
  iScustomer: string;
  login?: string;
  content?: string;
};
```

- 以上沒打問號的, 代表必填
- 以上資料除了會進到資料庫, 也會使用 nodemailer 寄信到.env 設定的 CUSTOMER_SERVICE_EMAIL
- 寄信的 server 使用.env 的 EMAIL_ACCOUNT 及 EMAIL_PASSWORD

## 6.偵測 IP 來源地區

| Item   | Value        |
| ------ | ------------ |
| Method | GET          |
| path   | **/checkip** |
| param  |              |

```typescript=
type ICheckIpRes = {
  ip: string; // client public ip
  location?: string; // 回傳地區代碼, 香港為 HK, 若為香港IP, 前端需顯示風險彈窗
};
```

## 7.取得即時新聞

| Item   | Value     |
| ------ | --------- |
| Method | GET       |
| path   | **/news** |
| param  |           |

```typescript=
type INewsRes = {
  author: string | null;
  imageUrl: string | null;
  id: string;
  createAt: number;
  text: string;
};
```
