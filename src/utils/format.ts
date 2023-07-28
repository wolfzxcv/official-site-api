import { Locales } from '../@types';

export const formatXForwardedFor = (value: string | undefined) => {
  if (value) {
    if (typeof value === 'string') {
      const output = value.split(',');
      return output[0];
    } else {
      return value;
    }
  } else {
    return undefined;
  }
};

export const formatExpressIp = (rawIp: string) => rawIp.split(':').pop();

export const formatLangDisplay = (locale: Locales) => {
  switch (locale) {
    case 'cn':
      return '簡';
    case 'zh':
      return '繁';
    case 'en':
      return '英';
    default:
      return null;
  }
};
