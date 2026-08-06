jest.mock('expo-localization', () => ({
  getLocales: jest.fn(),
}));

import { getLocales } from 'expo-localization';

import { i18n } from '@/src/core/i18n';
import { storageGetItem, storageSetItem } from '@/src/core/storage';
import { useLocaleStore } from '@/src/stores/localeStore';

jest.mock('@/src/core/storage', () => ({
  storageGetItem: jest.fn(),
  storageSetItem: jest.fn(),
}));

const mockedGetLocales = getLocales as jest.MockedFunction<typeof getLocales>;
const mockedStorageGetItem = storageGetItem as jest.MockedFunction<
  typeof storageGetItem
>;
const mockedStorageSetItem = storageSetItem as jest.MockedFunction<
  typeof storageSetItem
>;
const mockedChangeLanguage = jest.spyOn(i18n, 'changeLanguage');

describe('localeStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useLocaleStore.setState({ locale: 'en', isHydrated: false });
    mockedChangeLanguage.mockResolvedValue(i18n.t);
    mockedGetLocales.mockReturnValue([{ languageTag: 'en-US' } as never]);
  });

  it('hydrates saved locale from storage', async () => {
    mockedStorageGetItem.mockResolvedValue('vi');

    await useLocaleStore.getState().hydrate();

    expect(mockedChangeLanguage).toHaveBeenCalledWith('vi');
    expect(useLocaleStore.getState().locale).toBe('vi');
    expect(useLocaleStore.getState().isHydrated).toBe(true);
  });

  it('falls back to device locale when storage is empty', async () => {
    mockedStorageGetItem.mockResolvedValue(null);
    mockedGetLocales.mockReturnValue([{ languageTag: 'vi-VN' } as never]);

    await useLocaleStore.getState().hydrate();

    expect(mockedChangeLanguage).toHaveBeenCalledWith('vi');
    expect(useLocaleStore.getState().locale).toBe('vi');
  });

  it('persists locale when changed', async () => {
    await useLocaleStore.getState().setLocale('en');

    expect(mockedStorageSetItem).toHaveBeenCalledWith('app.locale', 'en');
    expect(mockedChangeLanguage).toHaveBeenCalledWith('en');
    expect(useLocaleStore.getState().locale).toBe('en');
  });
});
