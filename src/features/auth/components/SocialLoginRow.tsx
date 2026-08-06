import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppPressable } from '@/src/components/ui/AppPressable';
import { authIcons } from '@/src/features/auth/assets';
import { colors } from '@/src/theme/colors';
import { hasNativeSvg } from '@/src/utils/hasNativeSvg';

const googleIcon = require('../../../../assets/auth/icons/google-icon.png');
const DividerLine = authIcons.dividerLine;

function Divider() {
  if (hasNativeSvg()) {
    return <DividerLine height={1} style={styles.divider} />;
  }

  return <View style={[styles.divider, styles.dividerFallback]} />;
}

export function SocialLoginRow() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.dividerRow}>
        <Divider />
        <Text style={styles.dividerText}>{t('auth.orLoginWith')}</Text>
        <Divider />
      </View>

      <AppPressable
        accessibilityRole="button"
        accessibilityLabel={t('auth.continueWithGoogle')}
        onPress={() =>
          Alert.alert(
            t('common.comingSoonTitle'),
            t('auth.googleLoginComingSoon'),
          )
        }
        style={styles.googleButton}
      >
        <Image resizeMode="contain" source={googleIcon} style={styles.googleIcon} />
        <Text style={styles.googleLabel}>{t('auth.continueWithGoogle')}</Text>
      </AppPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 24,
  },
  dividerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  divider: {
    flex: 1,
  },
  dividerFallback: {
    height: 1,
    backgroundColor: colors.stroke,
  },
  dividerText: {
    fontSize: 12,
    color: colors.grey,
    textAlign: 'center',
  },
  googleButton: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.socialBorder,
    backgroundColor: colors.white,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  googleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.headline,
  },
});
