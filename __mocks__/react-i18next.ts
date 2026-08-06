import en from '@/src/core/i18n/locales/en.json';

function translate(key: string): string {
  const parts = key.split('.');
  let value: unknown = en;

  for (const part of parts) {
    if (value && typeof value === 'object' && part in value) {
      value = (value as Record<string, unknown>)[part];
      continue;
    }

    return key;
  }

  return typeof value === 'string' ? value : key;
}

export const useTranslation = () => ({
  t: translate,
  i18n: {
    changeLanguage: jest.fn().mockResolvedValue(undefined),
    language: 'en',
  },
});

export const initReactI18next = {
  type: '3rdParty',
  init: jest.fn(),
};
