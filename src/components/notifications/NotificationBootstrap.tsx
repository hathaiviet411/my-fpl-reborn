import { router } from 'expo-router';
import { useEffect } from 'react';

import { usePushNotifications } from '@/src/hooks/usePushNotifications';
import { initializeNotificationService } from '@/src/services/notificationService';

export function NotificationBootstrap() {
  usePushNotifications({
    onNotificationResponse: () => {
      router.push('/(drawer)/(main)/(tabs)/notifications');
    },
  });

  useEffect(() => {
    void initializeNotificationService();
  }, []);

  return null;
}
