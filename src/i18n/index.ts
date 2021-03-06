import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { ru, en, jp } from './resources';
import { useTranslation } from './hooks';

void i18n.use(initReactI18next).init({
  resources: {
    ru,
    en,
    jp,
  },
  lng: 'ru',
  debug: !IS_PROD,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  react: {
    useSuspense: false,
  },
});

export { useTranslation, i18n };
