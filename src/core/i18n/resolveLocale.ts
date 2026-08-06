export type AppLocale = 'en' | 'vi';

export function resolveLocale(languageTag?: string | null): AppLocale {
  if (!languageTag) {
    return 'en';
  }

  const normalized = languageTag.toLowerCase();

  if (normalized.startsWith('vi')) {
    return 'vi';
  }

  if (normalized.startsWith('en')) {
    return 'en';
  }

  return 'en';
}
