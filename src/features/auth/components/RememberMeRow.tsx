import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { authIcons } from '@/src/features/auth/assets';
import { colors } from '@/src/theme/colors';
import { hasNativeSvg } from '@/src/utils/hasNativeSvg';

const CheckboxIcon = authIcons.checkbox;

type RememberMeRowProps = {
  checked: boolean;
  onToggle: () => void;
};

export function RememberMeRow({ checked, onToggle }: RememberMeRowProps) {
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
        onPress={onToggle}
        style={styles.remember}
      >
        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
          {checked ? (
            hasNativeSvg() ? (
              <CheckboxIcon height={12} width={12} />
            ) : (
              <Ionicons color={colors.primary} name="checkmark" size={12} />
            )
          ) : null}
        </View>
        <Text style={styles.rememberLabel}>Remember me</Text>
      </Pressable>

      <Pressable
        onPress={() => Alert.alert('Coming soon', 'Forgot password is not available yet.')}
      >
        <Text style={styles.forgot}>Forgot Password ?</Text>
      </Pressable>
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
    gap: 5,
  },
  checkbox: {
    width: 19,
    height: 19,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.stroke,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryMuted,
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
