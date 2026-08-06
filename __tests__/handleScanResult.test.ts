import { Linking } from 'react-native';

import {
  handleScanResult,
  isHttpUrl,
} from '@/src/features/qr/utils/handleScanResult';

describe('handleScanResult', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Linking, 'canOpenURL').mockResolvedValue(true);
    jest.spyOn(Linking, 'openURL').mockResolvedValue();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('opens valid http URLs', async () => {
    const result = await handleScanResult('https://example.com/path');

    expect(Linking.canOpenURL).toHaveBeenCalledWith('https://example.com/path');
    expect(Linking.openURL).toHaveBeenCalledWith('https://example.com/path');
    expect(result).toEqual({
      type: 'opened_url',
      url: 'https://example.com/path',
    });
  });

  it('returns invalid for non-url payloads', async () => {
    const result = await handleScanResult('hello-world');

    expect(Linking.canOpenURL).not.toHaveBeenCalled();
    expect(Linking.openURL).not.toHaveBeenCalled();
    expect(result).toEqual({ type: 'invalid', data: 'hello-world' });
  });

  it('returns invalid when URL cannot be opened', async () => {
    jest.spyOn(Linking, 'canOpenURL').mockResolvedValue(false);

    const result = await handleScanResult('https://blocked.example');

    expect(result).toEqual({
      type: 'invalid',
      data: 'https://blocked.example',
    });
  });
});

describe('isHttpUrl', () => {
  it('accepts http and https URLs', () => {
    expect(isHttpUrl('https://example.com')).toBe(true);
    expect(isHttpUrl('http://example.com')).toBe(true);
  });

  it('rejects non-http schemes', () => {
    expect(isHttpUrl('myapp://home')).toBe(false);
    expect(isHttpUrl('not-a-url')).toBe(false);
  });
});
