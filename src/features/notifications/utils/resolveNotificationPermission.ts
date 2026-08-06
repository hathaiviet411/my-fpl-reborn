import type { NotificationPermissionsStatus } from 'expo-notifications';
import type { TFunction } from 'i18next';

import { showNotificationPermissionDeniedAlert } from '@/src/features/notifications/utils/notificationPermissionAlerts';

export async function resolveNotificationPermission(
  current: NotificationPermissionsStatus | null,
  request: () => Promise<NotificationPermissionsStatus>,
  t: TFunction,
): Promise<boolean> {
  if (current?.granted) {
    return true;
  }

  if (current && !current.granted && current.canAskAgain === false) {
    showNotificationPermissionDeniedAlert(t);
    return false;
  }

  const result = await request();

  if (result.granted) {
    return true;
  }

  if (result.canAskAgain === false) {
    showNotificationPermissionDeniedAlert(t);
  }

  return false;
}
