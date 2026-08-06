import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { AppPressable } from '@/src/components/ui/AppPressable';
import { colors } from '@/src/theme/colors';

type RememberMeRowProps = {
  checked: boolean;
  onToggle: () => void;
};

export function RememberMeRow({ checked, onToggle }: RememberMeRowProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.row}>
      <AppPressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
        hitSlop={4}
        onPress={onToggle}
        style={styles.remember}
      >
        <Ionicons
          color={checked ? colors.primary : colors.grey}
          name={checked ? 'checkbox' : 'square-outline'}
          size={20}
        />
        <Text style={styles.rememberLabel}>{t('auth.rememberMe')}</Text>
      </AppPressable>

      <AppPressable
        hitSlop={8}
        onPress={() =>
          Alert.alert(
            t('common.comingSoonTitle'),
            t('auth.forgotPasswordComingSoon'),
          )
        }
      >
        <Text style={styles.forgot}>{t('auth.forgotPassword')}</Text>
      </AppPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  remember: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rememberLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.grey,
  },
  forgot: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.link,
  },
});
