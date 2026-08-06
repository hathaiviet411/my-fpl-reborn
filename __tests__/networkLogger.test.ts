import { isNetworkLoggerEnabled } from '@/src/config/networkLogger';

describe('isNetworkLoggerEnabled', () => {
  const originalEnv = process.env.EXPO_PUBLIC_ENABLE_NETWORK_LOGGER;

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.EXPO_PUBLIC_ENABLE_NETWORK_LOGGER;
    } else {
      process.env.EXPO_PUBLIC_ENABLE_NETWORK_LOGGER = originalEnv;
    }
  });

  it('is enabled in development builds', () => {
    expect(isNetworkLoggerEnabled()).toBe(__DEV__);
  });

  it('can be enabled explicitly via EXPO_PUBLIC_ENABLE_NETWORK_LOGGER', () => {
    process.env.EXPO_PUBLIC_ENABLE_NETWORK_LOGGER = 'true';

    expect(isNetworkLoggerEnabled()).toBe(true);
  });

  it('stays disabled in production when the flag is false', () => {
    if (__DEV__) {
      return;
    }

    process.env.EXPO_PUBLIC_ENABLE_NETWORK_LOGGER = 'false';
    expect(isNetworkLoggerEnabled()).toBe(false);
  });
});
