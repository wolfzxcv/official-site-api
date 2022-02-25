import { Locales } from '../../@types';

const allLangs = [
  { code: 'cn', value: 886 },
  { code: 'ar', value: 966 },
  { code: 'en', value: 1 },
  { code: 'ms', value: 60 },
  { code: 'id', value: 62 },
  { code: 'vi', value: 84 },
  { code: 'zh', value: 86 }
];

type IQuery = {
  lang?: Locales | undefined;
};

export const checkLang = (query: IQuery) => {
  const lang = query?.lang;
  if (lang) {
    const hasLang = allLangs.find(each => each.code === lang);
    if (!!hasLang) {
      return hasLang.value;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
