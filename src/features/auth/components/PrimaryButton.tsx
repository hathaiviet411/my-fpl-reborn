import { GradientView } from '@/src/components/ui/GradientView';
import { AppPressable } from '@/src/components/ui/AppPressable';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';

import { colors } from '@/src/theme/colors';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export function PrimaryButton({
  label,
  onPress,
  loading = false,
  disabled = false,
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <AppPressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      style={[styles.wrapper, isDisabled && styles.disabled]}
    >
      <GradientView
        colors={[colors.primary, '#E85F00']}
        end={{ x: 1, y: 0 }}
        start={{ x: 0, y: 0 }}
        style={styles.gradient}
      >
        {loading ? (
          <ActivityIndicator color={colors.headerOnPrimary} />
        ) : (
          <Text style={styles.label}>{label}</Text>
        )}
      </GradientView>
    </AppPressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradient: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  label: {
    color: colors.headerOnPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  },
});
