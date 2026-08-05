import { requireOptionalNativeModule } from 'expo-modules-core';
import { NativeModules, TurboModuleRegistry } from 'react-native';

import type { KeyValueStorage } from '@/src/core/storage/types';

function createMemoryStorage(): KeyValueStorage {
  const data = new Map<string, string>();

  return {
    getItem: async (key) => data.get(key) ?? null,
    setItem: async (key, value) => {
      data.set(key, value);
    },
    removeItem: async (key) => {
      data.delete(key);
    },
  };
}

function hasAsyncStorageNativeModule(): boolean {
  return Boolean(
    TurboModuleRegistry?.get?.('RNCAsyncStorage') ??
      TurboModuleRegistry?.get?.('RNC_AsyncSQLiteDBStorage') ??
      TurboModuleRegistry?.get?.('PlatformLocalStorage') ??
      NativeModules.RNCAsyncStorage ??
      NativeModules.RNC_AsyncSQLiteDBStorage ??
      NativeModules.PlatformLocalStorage,
  );
}

async function createSecureStoreStorage(): Promise<KeyValueStorage | null> {
  if (requireOptionalNativeModule('ExpoSecureStore') == null) {
    return null;
  }

  try {
    const SecureStore = await import('expo-secure-store');
    return {
      getItem: SecureStore.getItemAsync,
      setItem: SecureStore.setItemAsync,
      removeItem: SecureStore.deleteItemAsync,
    };
  } catch {
    return null;
  }
}

async function createAsyncStorageStorage(): Promise<KeyValueStorage | null> {
  if (!hasAsyncStorageNativeModule()) {
    return null;
  }

  try {
    const { default: AsyncStorage } = await import(
      '@react-native-async-storage/async-storage'
    );

    return {
      getItem: (key) => AsyncStorage.getItem(key),
      setItem: (key, value) => AsyncStorage.setItem(key, value),
      removeItem: (key) => AsyncStorage.removeItem(key),
    };
  } catch {
    return null;
  }
}

export class StorageFactory {
  private static instance: KeyValueStorage | null = null;

  static async get(): Promise<KeyValueStorage> {
    if (StorageFactory.instance) {
      return StorageFactory.instance;
    }

    const secureStore = await createSecureStoreStorage();
    if (secureStore) {
      StorageFactory.instance = secureStore;
      return StorageFactory.instance;
    }

    const asyncStore = await createAsyncStorageStorage();
    if (asyncStore) {
      StorageFactory.instance = asyncStore;
      return StorageFactory.instance;
    }

    StorageFactory.instance = createMemoryStorage();
    return StorageFactory.instance;
  }

  /** @internal Resets cached instance — for tests only. */
  static resetForTests(): void {
    StorageFactory.instance = null;
  }
}
