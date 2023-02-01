import { Sites } from 'src/@types/sites';
import { Locales } from '../../@types';

/** en = 英, cn = 簡體中文, zh = 繁體中文  */
const allowLangs = ['en', 'cn', 'zh'];

/** g = 國際, b = IB代理, m = 金業  */
const allowSites = ['g', 'm'];

export type IQuery = {
  lang?: Locales | undefined;
  site?: Sites | undefined;
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

export const checkSite = (query: IQuery) => {
  const site = query?.site;
  if (site) {
    const hasSite = allowSites.includes(site);
    if (!!hasSite) {
      return site;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
