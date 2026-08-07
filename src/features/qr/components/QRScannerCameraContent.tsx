import { useCallback, useEffect, useState } from 'react';
import { CameraView, scanFromURLAsync } from 'expo-camera';
import type { BarcodeScanningResult, CameraType } from 'expo-camera';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  LayoutChangeEvent,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { QRScanOverlay } from '@/src/features/qr/components/QRScanOverlay';
import { QRScannerBottomChrome } from '@/src/features/qr/components/QRScannerBottomChrome';
import { QRScannerTopChrome } from '@/src/features/qr/components/QRScannerTopChrome';
import { useQRScannerPermissions } from '@/src/features/qr/hooks/useQRScannerPermissions';
import { handleScanResult } from '@/src/features/qr/utils/handleScanResult';

export function QRScannerCameraContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const { ensureCameraPermission, ensureMediaLibraryPermission } =
    useQRScannerPermissions();
  const [scanned, setScanned] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  }, []);

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

  const handleToggleFacing = useCallback(() => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }, []);

  const handleToggleTorch = useCallback(() => {
    setTorchEnabled((current) => !current);
  }, []);

  return (
    <View style={styles.root} onLayout={handleLayout}>
      {cameraReady ? (
        <CameraView
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          enableTorch={torchEnabled}
          facing={facing}
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          style={StyleSheet.absoluteFill}
        />
      ) : null}

      <QRScanOverlay height={layout.height} width={layout.width} />

      <SafeAreaView edges={['top']} style={styles.topChrome}>
        <QRScannerTopChrome
          onBack={() => router.back()}
          onToggleFacing={handleToggleFacing}
          onToggleTorch={handleToggleTorch}
          torchEnabled={torchEnabled}
        />
      </SafeAreaView>

      <QRScannerBottomChrome
        onOpenGallery={() => {
          void handlePickFromGallery();
        }}
        onScanAgain={handleScanAgain}
        showScanAgain={scanned}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  topChrome: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
});
