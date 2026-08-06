import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import type { TFunction } from 'i18next';

import { getExpoProjectId } from '@/src/features/notifications/utils/getExpoProjectId';
import { resolveNotificationPermission } from '@/src/features/notifications/utils/resolveNotificationPermission';

export async function getNotificationPermissionStatus() {
  return Notifications.getPermissionsAsync();
}

export async function fetchExpoPushToken(): Promise<string | null> {
  if (!Device.isDevice) {
    if (__DEV__) {
      console.warn(
        '[notifications] Push tokens are unavailable on simulators/emulators.',
      );
    }
    return null;
  }

  const projectId = getExpoProjectId();
  if (!projectId) {
    if (__DEV__) {
      console.warn(
        '[notifications] Missing EAS projectId. Set EXPO_PUBLIC_EAS_PROJECT_ID or expo.extra.eas.projectId.',
      );
    }
    return null;
  }

  try {
    const token = await Notifications.getExpoPushTokenAsync({ projectId });
    return token.data;
  } catch (error) {
    if (__DEV__) {
      console.warn('[notifications] Failed to fetch Expo push token.', error);
    }
    return null;
  }
}

export async function requestNotificationPermission(t: TFunction) {
  const current = await getNotificationPermissionStatus();
  const granted = await resolveNotificationPermission(
    current,
    Notifications.requestPermissionsAsync,
    t,
  );

  if (!granted) {
    return {
      granted: false as const,
      status: await getNotificationPermissionStatus(),
      expoPushToken: null,
    };
  }

  const expoPushToken = await fetchExpoPushToken();
  return {
    granted: true as const,
    status: await getNotificationPermissionStatus(),
    expoPushToken,
  };
}
