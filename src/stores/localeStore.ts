import { create } from 'zustand';

import { getDeviceLanguageTag } from '@/src/core/i18n/getDeviceLanguageTag';
import { i18n } from '@/src/core/i18n';
import {
  resolveLocale,
  type AppLocale,
} from '@/src/core/i18n/resolveLocale';
import { storageGetItem, storageSetItem } from '@/src/core/storage';

const LOCALE_STORAGE_KEY = 'app.locale';

type LocaleState = {
  locale: AppLocale;
  isHydrated: boolean;
  hydrate: () => Promise<void>;
  setLocale: (locale: AppLocale) => Promise<void>;
};

async function applyLocale(locale: AppLocale) {
  await i18n.changeLanguage(locale);
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: 'en',
  isHydrated: false,

  hydrate: async () => {
    const savedLocale = await storageGetItem(LOCALE_STORAGE_KEY);
    const deviceLocale = await getDeviceLanguageTag();
    const locale = savedLocale
      ? resolveLocale(savedLocale)
      : resolveLocale(deviceLocale);

    await applyLocale(locale);
    set({ locale, isHydrated: true });
  },

  setLocale: async (locale) => {
    await storageSetItem(LOCALE_STORAGE_KEY, locale);
    await applyLocale(locale);
    set({ locale });
  },
}));
