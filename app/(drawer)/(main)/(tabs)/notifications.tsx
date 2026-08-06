import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import * as Device from 'expo-device';

import { ScreenPlaceholder } from '@/src/components/ScreenPlaceholder';
import { AppPressable } from '@/src/components/ui/AppPressable';
import {
  getNotificationPermissionStatus,
  requestNotificationPermission,
} from '@/src/services/notificationPermissionService';
import { scheduleLocalNotification } from '@/src/services/notificationService';
import { colors } from '@/src/theme/colors';

export default function NotificationsScreen() {
  const { t } = useTranslation();
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    void (async () => {
      const status = await getNotificationPermissionStatus();
      setPermissionGranted(status.granted);
    })();
  }, []);

  const handleEnablePush = useCallback(async () => {
    setIsRequesting(true);
    try {
      const result = await requestNotificationPermission(t);
      setPermissionGranted(result.granted);
      setExpoPushToken(result.expoPushToken);
    } finally {
      setIsRequesting(false);
    }
  }, [t]);

  const handleSendTestLocal = useCallback(async () => {
    await scheduleLocalNotification(
      t('notifications.testLocalTitle'),
      t('notifications.testLocalBody'),
    );
  }, [t]);

  return (
    <ScreenPlaceholder
      description={t('notifications.description')}
      title={t('navigation.notifications')}
    >
      <View style={styles.panel}>
        <Text style={styles.statusLabel}>
          {permissionGranted
            ? t('notifications.permissionGranted')
            : t('notifications.permissionPrompt')}
        </Text>

        {!permissionGranted ? (
          <AppPressable
            accessibilityRole="button"
            disabled={isRequesting}
            onPress={() => {
              void handleEnablePush();
            }}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonLabel}>
              {isRequesting
                ? t('notifications.enabling')
                : t('notifications.enablePush')}
            </Text>
          </AppPressable>
        ) : null}

        {permissionGranted ? (
          <AppPressable
            accessibilityRole="button"
            onPress={() => {
              void handleSendTestLocal();
            }}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonLabel}>
              {t('notifications.sendTestLocal')}
            </Text>
          </AppPressable>
        ) : null}

        {expoPushToken ? (
          <Text selectable style={styles.token}>
            {t('notifications.pushToken')}: {expoPushToken}
          </Text>
        ) : null}

        {!Device.isDevice ? (
          <Text style={styles.hint}>{t('notifications.simulatorHint')}</Text>
        ) : null}
      </View>
    </ScreenPlaceholder>
  );
}

const styles = StyleSheet.create({
  panel: {
    width: '100%',
    marginTop: 24,
    gap: 12,
  },
  statusLabel: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textNormal,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  primaryButtonLabel: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryButton: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  secondaryButtonLabel: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  token: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.grey,
    textAlign: 'center',
  },
  hint: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.grey,
    textAlign: 'center',
  },
});
