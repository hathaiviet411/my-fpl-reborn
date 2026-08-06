import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

export const DEFAULT_NOTIFICATION_CHANNEL_ID = 'default';

let isHandlerConfigured = false;

export function configureNotificationHandler() {
  if (isHandlerConfigured) {
    return;
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  isHandlerConfigured = true;
}

export async function setupAndroidNotificationChannel() {
  if (Platform.OS !== 'android') {
    return;
  }

  await Notifications.setNotificationChannelAsync(DEFAULT_NOTIFICATION_CHANNEL_ID, {
    name: 'Default',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FB6C00',
    sound: 'default',
  });
}

export async function initializeNotificationService() {
  configureNotificationHandler();
  await setupAndroidNotificationChannel();
}

export async function scheduleLocalNotification(
  title: string,
  body: string,
  seconds = 1,
) {
  return Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: 'default',
      ...(Platform.OS === 'android'
        ? { channelId: DEFAULT_NOTIFICATION_CHANNEL_ID }
        : {}),
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
    },
  });
}
