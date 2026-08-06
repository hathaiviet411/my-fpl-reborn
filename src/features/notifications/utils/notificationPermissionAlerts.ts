import { Alert, Linking } from 'react-native';
import type { TFunction } from 'i18next';

export function showNotificationPermissionDeniedAlert(t: TFunction) {
  Alert.alert(
    t('notifications.permission.title'),
    t('notifications.permission.message'),
    [
      { text: t('notifications.permission.cancel'), style: 'cancel' },
      {
        text: t('notifications.permission.openSettings'),
        onPress: () => {
          void Linking.openSettings();
        },
      },
    ],
  );
}
