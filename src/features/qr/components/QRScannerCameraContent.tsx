import { useCallback, useEffect, useState } from 'react';
import { CameraView, scanFromURLAsync } from 'expo-camera';
import type { BarcodeScanningResult } from 'expo-camera';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppPressable } from '@/src/components/ui/AppPressable';
import { QRScanOverlay } from '@/src/features/qr/components/QRScanOverlay';
import { useQRScannerPermissions } from '@/src/features/qr/hooks/useQRScannerPermissions';
import { handleScanResult } from '@/src/features/qr/utils/handleScanResult';
import { colors } from '@/src/theme/colors';

export function QRScannerCameraContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const { ensureCameraPermission, ensureMediaLibraryPermission } =
    useQRScannerPermissions();
  const [scanned, setScanned] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    void (async () => {
      const granted = await ensureCameraPermission();
      setCameraReady(granted);
      if (!granted) {
        router.back();
      }
    })();
  }, [ensureCameraPermission, router]);

  const processScanData = useCallback(
    async (data: string) => {
      const result = await handleScanResult(data);

      if (result.type === 'opened_url') {
        router.back();
        return;
      }

      Alert.alert(
        t('qr.invalidResult'),
        t('qr.invalidResultMessage', { data: result.data }),
        [
          {
            text: t('qr.scanAgain'),
            onPress: () => setScanned(false),
          },
        ],
      );
    },
    [router, t],
  );

  const handleBarcodeScanned = useCallback(
    ({ data }: BarcodeScanningResult) => {
      if (scanned) {
        return;
      }

      setScanned(true);
      void processScanData(data);
    },
    [processScanData, scanned],
  );

  const handlePickFromGallery = useCallback(async () => {
    const granted = await ensureMediaLibraryPermission();
    if (!granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (result.canceled || !result.assets[0]?.uri) {
      return;
    }

    const decoded = await scanFromURLAsync(result.assets[0].uri, ['qr']);

    if (!decoded.length) {
      Alert.alert(t('qr.noCodeFound'));
      return;
    }

    setScanned(true);
    await processScanData(decoded[0]?.data ?? '');
  }, [ensureMediaLibraryPermission, processScanData, t]);

  const handleScanAgain = useCallback(() => {
    setScanned(false);
  }, []);

  return (
    <View style={styles.root}>
      {cameraReady ? (
        <CameraView
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          style={StyleSheet.absoluteFill}
        />
      ) : null}

      <QRScanOverlay />

      <SafeAreaView edges={['top', 'bottom']} style={styles.chrome}>
        <View style={styles.header}>
          <AppPressable
            accessibilityLabel={t('qr.close')}
            accessibilityRole="button"
            onPress={() => router.back()}
            style={styles.closeButton}
          >
            <Text style={styles.closeLabel}>{t('qr.close')}</Text>
          </AppPressable>
          <Text style={styles.title}>{t('qr.title')}</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.footer}>
          <AppPressable
            accessibilityRole="button"
            onPress={() => {
              void handlePickFromGallery();
            }}
            style={styles.footerButton}
          >
            <Text style={styles.footerButtonLabel}>
              {t('qr.uploadFromGallery')}
            </Text>
          </AppPressable>

          {scanned ? (
            <AppPressable
              accessibilityRole="button"
              onPress={handleScanAgain}
              style={[styles.footerButton, styles.scanAgainButton]}
            >
              <Text style={styles.footerButtonLabel}>{t('qr.scanAgain')}</Text>
            </AppPressable>
          ) : null}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  chrome: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  closeButton: {
    minWidth: 64,
    paddingVertical: 8,
  },
  closeLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.white,
    fontSize: 17,
    fontWeight: '600',
  },
  headerSpacer: {
    minWidth: 64,
  },
  footer: {
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  footerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  scanAgainButton: {
    backgroundColor: colors.primary,
  },
  footerButtonLabel: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
});
