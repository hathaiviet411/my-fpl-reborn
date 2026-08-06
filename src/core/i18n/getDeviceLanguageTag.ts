export async function getDeviceLanguageTag(): Promise<string | undefined> {
  try {
    const { getLocales } =
      require('expo-localization') as typeof import('expo-localization');

    return getLocales()?.[0]?.languageTag;
  } catch (error) {
    if (__DEV__) {
      console.warn(
        '[i18n] expo-localization unavailable. Rebuild the native app after adding native modules.',
        error,
      );
    }

    return undefined;
  }
}
