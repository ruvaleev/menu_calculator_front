import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import enLocale from './en.json';
import ruLocale from './ru.json';

const localesFiles = Object.assign(enLocale, ruLocale);

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    return /*'en'; */ Localization.getLocalizationAsync().then(({ locale }) => {
      callback(locale);
    });
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    react: { 
      useSuspense: process.env.NODE_ENV != 'test'
    },
    resources: localesFiles,
    debug: process.env.NODE_ENV == 'development',
    interpolation: {
      escapeValue: false
    },
  });

export default i18n;
