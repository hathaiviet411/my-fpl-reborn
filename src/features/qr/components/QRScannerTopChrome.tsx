import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';

import { AppPressable } from '@/src/components/ui/AppPressable';
import { QR_SCANNER_HORIZONTAL_PADDING } from '@/src/features/qr/qrScannerConfig';
import { colors } from '@/src/theme/colors';

const fptLogo = require('@/assets/auth/images/logo.png');

type QRScannerTopChromeProps = {
  onBack: () => void;
  onToggleFacing: () => void;
  onToggleTorch: () => void;
  torchEnabled: boolean;
};

export function QRScannerTopChrome({
  onBack,
  onToggleFacing,
  onToggleTorch,
  torchEnabled,
}: QRScannerTopChromeProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <AppPressable
          accessibilityLabel={t('qr.back')}
          accessibilityRole="button"
          hitSlop={8}
          onPress={onBack}
          style={styles.headerIconButton}
        >
          <Ionicons color={colors.white} name="chevron-back" size={28} />
        </AppPressable>

        <View style={styles.headerSpacer} />

        <View style={styles.headerActions}>
          <AppPressable
            accessibilityLabel={t('qr.flipCamera')}
            accessibilityRole="button"
            hitSlop={8}
            onPress={onToggleFacing}
            style={styles.headerIconButton}
          >
            <MaterialCommunityIcons
              color={colors.white}
              name="camera-flip-outline"
              size={24}
            />
          </AppPressable>
          <AppPressable
            accessibilityLabel={t('qr.toggleFlash')}
            accessibilityRole="button"
            hitSlop={8}
            onPress={onToggleTorch}
            style={styles.headerIconButton}
          >
            <Ionicons
              color={colors.white}
              name={torchEnabled ? 'flash' : 'flash-outline'}
              size={22}
            />
          </AppPressable>
        </View>
      </View>

      <Text style={styles.instruction}>{t('qr.instruction')}</Text>

      <View style={styles.logoWrap}>
        <Image
          accessibilityLabel="FPT Polytechnic"
          resizeMode="contain"
          source={fptLogo}
          style={styles.logo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: QR_SCANNER_HORIZONTAL_PADDING,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
  },
  headerIconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: {
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instruction: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  logoWrap: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  logo: {
    width: 200,
    height: 56,
  },
});
