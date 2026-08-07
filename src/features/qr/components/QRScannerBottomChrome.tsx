import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppPressable } from '@/src/components/ui/AppPressable';
import { QR_SCANNER_HORIZONTAL_PADDING } from '@/src/features/qr/qrScannerConfig';
import { colors } from '@/src/theme/colors';

type QRScannerBottomChromeProps = {
  onOpenGallery: () => void;
  onScanAgain?: () => void;
  showScanAgain: boolean;
};

export function QRScannerBottomChrome({
  onOpenGallery,
  onScanAgain,
  showScanAgain,
}: QRScannerBottomChromeProps) {
  const { t } = useTranslation();

  const showComingSoon = () => {
    Alert.alert(t('common.comingSoonTitle'), t('common.comingSoonMessage'));
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      {showScanAgain && onScanAgain ? (
        <View style={styles.scanAgainWrap}>
          <AppPressable
            accessibilityRole="button"
            onPress={onScanAgain}
            style={styles.scanAgainButton}
          >
            <Text style={styles.scanAgainLabel}>{t('qr.scanAgain')}</Text>
          </AppPressable>
        </View>
      ) : null}

      <View style={styles.bottomBar}>
        <AppPressable
          accessibilityRole="button"
          onPress={showComingSoon}
          style={styles.bottomAction}
        >
          <MaterialCommunityIcons
            color={colors.white}
            name="history"
            size={26}
          />
          <Text style={styles.bottomActionLabel}>{t('qr.history')}</Text>
        </AppPressable>

        <AppPressable
          accessibilityRole="button"
          onPress={showComingSoon}
          style={styles.bottomAction}
        >
          <MaterialCommunityIcons
            color={colors.white}
            name="qrcode"
            size={26}
          />
          <Text style={styles.bottomActionLabel}>{t('qr.myQr')}</Text>
        </AppPressable>

        <AppPressable
          accessibilityRole="button"
          onPress={onOpenGallery}
          style={styles.bottomAction}
        >
          <Ionicons color={colors.white} name="images-outline" size={26} />
          <Text style={styles.bottomActionLabel}>{t('qr.gallery')}</Text>
        </AppPressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: QR_SCANNER_HORIZONTAL_PADDING,
    paddingTop: 12,
    paddingBottom: 8,
  },
  bottomAction: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
  },
  bottomActionLabel: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  scanAgainWrap: {
    paddingHorizontal: QR_SCANNER_HORIZONTAL_PADDING,
    paddingBottom: 8,
  },
  scanAgainButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  scanAgainLabel: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
});
