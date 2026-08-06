import type { TFunction } from 'i18next';

import { showPermissionDeniedAlert } from '@/src/features/qr/utils/permissionAlerts';

export type PermissionResponse = {
  granted: boolean;
  canAskAgain: boolean;
};

export async function resolvePermissionRequest(
  current: PermissionResponse | null,
  request: () => Promise<PermissionResponse>,
  type: 'camera' | 'photos',
  t: TFunction,
): Promise<boolean> {
  if (current?.granted) {
    return true;
  }

  if (current && !current.granted && !current.canAskAgain) {
    showPermissionDeniedAlert(type, t);
    return false;
  }

  const result = await request();

  if (result.granted) {
    return true;
  }

  if (!result.canAskAgain) {
    showPermissionDeniedAlert(type, t);
  }

  return false;
}
