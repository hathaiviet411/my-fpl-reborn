import { getDeviceLanguageTag } from '@/src/core/i18n/getDeviceLanguageTag';

jest.mock('expo-localization', () => ({
  getLocales: jest.fn(),
}));

import { getLocales } from 'expo-localization';

const mockedGetLocales = getLocales as jest.MockedFunction<typeof getLocales>;

describe('getDeviceLanguageTag', () => {
  it('returns the first device language tag', async () => {
    mockedGetLocales.mockReturnValue([{ languageTag: 'vi-VN' } as never]);

    await expect(getDeviceLanguageTag()).resolves.toBe('vi-VN');
  });

  it('returns undefined when getLocales throws', async () => {
    mockedGetLocales.mockImplementation(() => {
      throw new Error('Cannot find native module ExpoLocalization');
    });

    await expect(getDeviceLanguageTag()).resolves.toBeUndefined();
  });
});
