import { resolveLocale } from '@/src/core/i18n/resolveLocale';

describe('resolveLocale', () => {
  it('maps Vietnamese tags to vi', () => {
    expect(resolveLocale('vi')).toBe('vi');
    expect(resolveLocale('vi-VN')).toBe('vi');
  });

  it('maps English tags to en', () => {
    expect(resolveLocale('en')).toBe('en');
    expect(resolveLocale('en-US')).toBe('en');
  });

  it('falls back to en for unsupported locales', () => {
    expect(resolveLocale('fr')).toBe('en');
    expect(resolveLocale(null)).toBe('en');
  });
});
