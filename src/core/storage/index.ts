import { StorageFactory } from '@/src/core/storage/StorageFactory';

export type { KeyValueStorage } from '@/src/core/storage/types';

export async function storageGetItem(key: string): Promise<string | null> {
  const store = await StorageFactory.get();
  return store.getItem(key);
}

export async function storageSetItem(key: string, value: string): Promise<void> {
  const store = await StorageFactory.get();
  await store.setItem(key, value);
}

export async function storageRemoveItem(key: string): Promise<void> {
  const store = await StorageFactory.get();
  await store.removeItem(key);
}
