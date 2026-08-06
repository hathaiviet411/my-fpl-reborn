import { useCallback } from 'react';
import { useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';

import { resolvePermissionRequest } from '@/src/features/qr/utils/resolvePermissionRequest';

export function useQRScannerPermissions() {
  const { t } = useTranslation();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const ensureCameraPermission = useCallback(async () => {
    return resolvePermissionRequest(
      cameraPermission,
      requestCameraPermission,
      'camera',
      t,
    );
  }, [cameraPermission, requestCameraPermission, t]);

  const ensureMediaLibraryPermission = useCallback(async () => {
    return resolvePermissionRequest(
      mediaPermission,
      requestMediaPermission,
      'photos',
      t,
    );
  }, [mediaPermission, requestMediaPermission, t]);

  return {
    cameraPermission,
    mediaPermission,
    ensureCameraPermission,
    ensureMediaLibraryPermission,
  };
}
