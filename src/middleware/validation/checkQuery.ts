import { Sites } from 'src/@types/sites';
import { Locales } from '../../@types';

const allowLangs = ['en', 'cn', 'zh'];

const allowSites = ['g', 'b', 'm'];

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
