import { storageGetItem, storageSetItem } from '@/src/core/storage';

import {
  getDefaultAvatarSource,
  isDefaultAvatarKey,
  pickRandomDefaultAvatarKey,
  type DefaultAvatarKey,
} from './defaultAvatars';

const STORAGE_KEY_PREFIX = 'avatar.defaultKey';

/** SecureStore only allows alphanumeric, ".", "-", and "_". */
export function sanitizeStorageKeyPart(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]/g, '_');
}

function getStorageKey(userKey: string) {
  return `${STORAGE_KEY_PREFIX}.${sanitizeStorageKeyPart(userKey)}`;
}

export async function resolvePersistedDefaultAvatarKey(
  userKey: string,
): Promise<DefaultAvatarKey> {
  const storageKey = getStorageKey(userKey);
  const saved = await storageGetItem(storageKey);

  if (saved && isDefaultAvatarKey(saved)) {
    return saved;
  }

  const randomKey = pickRandomDefaultAvatarKey();
  await storageSetItem(storageKey, randomKey);
  return randomKey;
}

export async function resolvePersistedDefaultAvatarSource(userKey: string) {
  const key = await resolvePersistedDefaultAvatarKey(userKey);
  return getDefaultAvatarSource(key);
}
