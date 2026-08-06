import { requireOptionalNativeModule } from 'expo-modules-core';

export function isExpoCameraAvailable() {
  return requireOptionalNativeModule('ExpoCamera') != null;
}
