import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/src/core/i18n/locales/en.json';
import vi from '@/src/core/i18n/locales/vi.json';

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v4',
});

export { i18n };
