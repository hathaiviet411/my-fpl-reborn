import { StorageFactory } from '@/src/core/storage/StorageFactory';
import { DEFAULT_AVATAR_KEYS } from '@/src/features/avatar/defaultAvatars';
import {
  resolvePersistedDefaultAvatarKey,
  sanitizeStorageKeyPart,
} from '@/src/features/avatar/persistedDefaultAvatar';

describe('sanitizeStorageKeyPart', () => {
  it('replaces characters invalid for SecureStore keys', () => {
    expect(sanitizeStorageKeyPart('ctv.vietht@fpt.edu.vn')).toBe(
      'ctv.vietht_fpt.edu.vn',
    );
  });
});

describe('resolvePersistedDefaultAvatarKey', () => {
  beforeEach(() => {
    StorageFactory.resetForTests();
  });

  it('persists the same random avatar key for a user', async () => {
    const first = await resolvePersistedDefaultAvatarKey('ctv.vietht@fpt.edu.vn');
    const second = await resolvePersistedDefaultAvatarKey('ctv.vietht@fpt.edu.vn');

    expect(DEFAULT_AVATAR_KEYS).toContain(first);
    expect(second).toBe(first);
  });

  it('uses different keys for different users', async () => {
    const userA = await resolvePersistedDefaultAvatarKey('user-a@fpt.edu.vn');
    const userB = await resolvePersistedDefaultAvatarKey('user-b@fpt.edu.vn');

    expect(DEFAULT_AVATAR_KEYS).toContain(userA);
    expect(DEFAULT_AVATAR_KEYS).toContain(userB);
  });
});
