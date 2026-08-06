import { Alert, Linking } from 'react-native';

import { resolvePermissionRequest } from '@/src/features/qr/utils/resolvePermissionRequest';

const t = (key: string) => key;

describe('resolvePermissionRequest', () => {
  beforeEach(() => {
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    jest.spyOn(Linking, 'openSettings').mockResolvedValue();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns true when permission is already granted', async () => {
    const request = jest.fn();

    const granted = await resolvePermissionRequest(
      { granted: true, canAskAgain: true },
      request,
      'camera',
      t,
    );

    expect(granted).toBe(true);
    expect(request).not.toHaveBeenCalled();
  });

  it('requests permission when undetermined', async () => {
    const request = jest.fn().mockResolvedValue({
      granted: true,
      canAskAgain: true,
    });

    const granted = await resolvePermissionRequest(
      null,
      request,
      'camera',
      t,
    );

    expect(request).toHaveBeenCalled();
    expect(granted).toBe(true);
  });

  it('shows settings alert when permanently denied', async () => {
    const request = jest.fn();

    const granted = await resolvePermissionRequest(
      { granted: false, canAskAgain: false },
      request,
      'photos',
      t,
    );

    expect(request).not.toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalled();
    expect(granted).toBe(false);
  });
});
