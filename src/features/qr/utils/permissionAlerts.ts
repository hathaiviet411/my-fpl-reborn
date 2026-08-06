import { Alert, Linking } from 'react-native';
import type { TFunction } from 'i18next';

export type PermissionType = 'camera' | 'photos';

export function showPermissionDeniedAlert(
  type: PermissionType,
  t: TFunction,
) {
  const titleKey =
    type === 'camera'
      ? 'qr.permission.cameraTitle'
      : 'qr.permission.photosTitle';
  const messageKey =
    type === 'camera'
      ? 'qr.permission.cameraMessage'
      : 'qr.permission.photosMessage';

  Alert.alert(t(titleKey), t(messageKey), [
    { text: t('qr.permission.cancel'), style: 'cancel' },
    {
      text: t('qr.permission.openSettings'),
      onPress: () => {
        void Linking.openSettings();
      },
    },
  ]);
}
