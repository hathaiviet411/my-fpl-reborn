import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type * as Notifications from 'expo-notifications';

import {
  fetchExpoPushToken,
  getNotificationPermissionStatus,
  requestNotificationPermission as requestNotificationPermissionFlow,
} from '@/src/services/notificationPermissionService';
import { useNotificationListeners } from '@/src/hooks/useNotificationListeners';

type UsePushNotificationsOptions = {
  onNotificationReceived?: (
    notification: Notifications.Notification,
  ) => void;
  onNotificationResponse?: (
    response: Notifications.NotificationResponse,
  ) => void;
};

export function usePushNotifications(
  options: UsePushNotificationsOptions = {},
) {
  const { t } = useTranslation();
  const [permissionStatus, setPermissionStatus] =
    useState<Notifications.NotificationPermissionsStatus | null>(null);
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  useNotificationListeners(options);

  const refreshPermissionStatus = useCallback(async () => {
    const status = await getNotificationPermissionStatus();
    setPermissionStatus(status);
    return status;
  }, []);

  const requestNotificationPermission = useCallback(async () => {
    const result = await requestNotificationPermissionFlow(t);
    setPermissionStatus(result.status);
    setExpoPushToken(result.expoPushToken);
    return result;
  }, [t]);

  const loadExpoPushToken = useCallback(async () => {
    const token = await fetchExpoPushToken();
    setExpoPushToken(token);
    return token;
  }, []);

  useEffect(() => {
    void refreshPermissionStatus();
  }, [refreshPermissionStatus]);

  return {
    permissionStatus,
    expoPushToken,
    requestNotificationPermission,
    refreshPermissionStatus,
    fetchExpoPushToken: loadExpoPushToken,
    isPhysicalDevice: Device.isDevice,
    appOwnership: Constants.appOwnership,
  };
}
