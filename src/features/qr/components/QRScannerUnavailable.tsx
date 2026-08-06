import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppPressable } from '@/src/components/ui/AppPressable';
import { colors } from '@/src/theme/colors';

export function QRScannerUnavailable() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('qr.unavailableTitle')}</Text>
        <Text style={styles.message}>{t('qr.unavailableMessage')}</Text>
        <AppPressable
          accessibilityRole="button"
          onPress={() => router.back()}
          style={styles.button}
        >
          <Text style={styles.buttonLabel}>{t('qr.close')}</Text>
        </AppPressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  message: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  button: {
    marginTop: 12,
    alignSelf: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonLabel: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
});
