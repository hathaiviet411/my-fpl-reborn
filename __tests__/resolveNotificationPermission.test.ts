import { Alert, Linking } from 'react-native';

import { resolveNotificationPermission } from '@/src/features/notifications/utils/resolveNotificationPermission';

const t = (key: string) => key;

describe('resolveNotificationPermission', () => {
  beforeEach(() => {
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    jest.spyOn(Linking, 'openSettings').mockResolvedValue();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns true when permission is already granted', async () => {
    const request = jest.fn();

    const granted = await resolveNotificationPermission(
      { granted: true, status: 'granted', canAskAgain: true },
      request,
      t,
    );

    expect(granted).toBe(true);
    expect(request).not.toHaveBeenCalled();
  });

  it('requests permission when not yet granted', async () => {
    const request = jest.fn().mockResolvedValue({
      granted: true,
      status: 'granted',
      canAskAgain: true,
    });

    const granted = await resolveNotificationPermission(
      { granted: false, status: 'undetermined', canAskAgain: true },
      request,
      t,
    );

    expect(request).toHaveBeenCalled();
    expect(granted).toBe(true);
  });

  it('shows settings alert when permanently denied', async () => {
    const request = jest.fn();

    const granted = await resolveNotificationPermission(
      { granted: false, status: 'denied', canAskAgain: false },
      request,
      t,
    );

    expect(request).not.toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalled();
    expect(granted).toBe(false);
  });
});
