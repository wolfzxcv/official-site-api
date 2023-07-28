import { Locales } from '../../@types';

/** en = 英, cn = 簡體中文, zh = 繁體中文  */
const allowLangs = ['en', 'cn', 'zh'];

export type IQuery = {
  lang?: Locales | undefined;
};

export const checkLang = (query: IQuery) => {
  const lang = query?.lang;
  if (lang) {
    const hasLang = allowLangs.includes(lang);
    if (!!hasLang) {
      return lang;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
