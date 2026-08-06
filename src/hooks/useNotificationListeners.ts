import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from 'react';

type UseNotificationListenersOptions = {
  onNotificationReceived?: (
    notification: Notifications.Notification,
  ) => void;
  onNotificationResponse?: (
    response: Notifications.NotificationResponse,
  ) => void;
};

export function useNotificationListeners(
  options: UseNotificationListenersOptions = {},
) {
  const onReceivedRef = useRef(options.onNotificationReceived);
  const onResponseRef = useRef(options.onNotificationResponse);

  useEffect(() => {
    onReceivedRef.current = options.onNotificationReceived;
    onResponseRef.current = options.onNotificationResponse;
  });

  useEffect(() => {
    const receivedSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        onReceivedRef.current?.(notification);
      },
    );

    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        onResponseRef.current?.(response);
      });

    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }, []);
}
