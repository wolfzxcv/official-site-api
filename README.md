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

- API 回傳 time 的規則

  - 如果該筆資料, 有 showTime,則回傳 showTime
  - 若無,則回傳 createTime
  - createTime = 文章創建時間, showTime = 日期選擇器時間

- Order of priority
  - onTop === 1
  - showTime(DESC)
  - createTime(DESC)

```typescript=
type DataOutputFormat = {
  id: number;
  title: string;
  content: string;
  url?: string;  // 目前僅有 企業責任 會有這個參數
  onTop?: boolean;  // 目前僅有 平台公告 會有這個參數
  time: string;
};
```

## 1.市場分析

| Item   | Value       |
| ------ | ----------- |
| Method | GET         |
| path   | **/market** |
| param  | lang        |
| table  | g_market    |

## 2.企業責任

| Item   | Value               |
| ------ | ------------------- |
| Method | GET                 |
| path   | **/responsibility** |
| param  | lang                |
| table  | g_responsibility    |

## 3.平台公告

| Item   | Value       |
| ------ | ----------- |
| Method | GET         |
| path   | **/notice** |
| param  | lang        |
| param  | site        |
| table  | \*\_notice  |

## 4.聯繫我們

| Item   | Value        |
| ------ | ------------ |
| Method | POST         |
| path   | **/contact** |
| param  |              |
| table  | g_contact    |

```typescript=
type IContactInput = {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  area: string;
  type: string;
  account?: string;
  content?: string;
};
```

- 以上沒打問號的, 代表必填
- 以上資料除了會進到資料庫, 也會使用 nodemailer 寄信到.env 設定的 CUSTOMER_SERVICE_EMAIL
- 寄信的 server 使用.env 的 EMAIL_ACCOUNT 及 EMAIL_PASSWORD

## 5.取得即時新聞

| Item   | Value     |
| ------ | --------- |
| Method | GET       |
| path   | **/news** |
| param  |           |

```typescript=
type INewsRes = {
  imageUrl: string | null;
  id: string;
  createAt: number;
  text: string;
};
```

## 6.偵測 IP 來源地區

| Item   | Value        |
| ------ | ------------ |
| Method | GET          |
| path   | **/checkip** |
| param  |              |

```typescript=
type ICheckIpRes = {
  ip: string; // client public ip
  location?: string; // 回傳地區代碼, 香港為 HK
};
```

## 7.WCGTGH 廣告投放

| Item   | Value       |
| ------ | ----------- |
| Method | POST        |
| path   | **/wcgtgh** |
| param  |             |
| table  | g_WCGTGH    |

```typescript=
type IPromotion = {
  name: string;
  email: string;
  mobile: string;
  qq?: string;
};
```

- 以上沒打問號的, 代表必填
- 以上資料除了會進到資料庫, 也會使用 nodemailer 寄信到.env 設定的 CUSTOMER_SERVICE_EMAIL
- 寄信的 server 使用.env 的 EMAIL_ACCOUNT 及 EMAIL_PASSWORD

## 8. 成為代理

| Item   | Value       |
| ------ | ----------- |
| Method | POST        |
| path   | **/broker** |
| param  |             |
| table  | m_broker    |

```typescript=
type IPromotion = {
  name: string;
  email: string;
  mobile: string;
  qq?: string;
};
```

- 以上沒打問號的, 代表必填
- 以上資料除了會進到資料庫, 也會使用 nodemailer 寄信到.env 設定的 CUSTOMER_SERVICE_EMAIL
- 寄信的 server 使用.env 的 EMAIL_ACCOUNT 及 EMAIL_PASSWORD

### 環境變數

- PORT
  - 跑在哪個 port
- DB_HOST_DEV
  - 開發環境的 DB domain/ip
- DB_HOST_PROD
  - 正式環境的 DB domain/ip
- DB_PORT
  - DB 的 port
- DB_USERNAME
  - DB username
- DB_PASSWORD
  - DB password
- DB_NAME
  - DB name
- MAX_QUERY
  - 回傳給前台的 API, 最多幾筆
- SESSION_SECRET
  - session secret
- CUSTOMER_SERVICE_EMAIL
  - 聯絡我們/活動表單, 收件者
- EMAIL_SENDER
  - Email sender
- EMAIL_HOST
  - Email host/server
- EMAIL_PORT
  - Email port
- EMAIL_ACCOUNT
  - Email account
- EMAIL_PASSWORD
  - Email password
