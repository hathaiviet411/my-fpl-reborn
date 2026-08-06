import { lazy, Suspense } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { QRScannerUnavailable } from '@/src/features/qr/components/QRScannerUnavailable';
import { isExpoCameraAvailable } from '@/src/features/qr/utils/cameraModule';
import { colors } from '@/src/theme/colors';

const QRScannerCameraContent = lazy(async () => {
  const module = await import(
    '@/src/features/qr/components/QRScannerCameraContent'
  );
  return { default: module.QRScannerCameraContent };
});

export function QRScannerScreen() {
  if (!isExpoCameraAvailable()) {
    return <QRScannerUnavailable />;
  }

  return (
    <Suspense
      fallback={
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      }
    >
      <QRScannerCameraContent />
    </Suspense>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});
