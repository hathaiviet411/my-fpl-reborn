import { Image, StyleSheet } from 'react-native';

import { AppPressable } from '@/src/components/ui/AppPressable';
import { authImages } from '@/src/features/auth/assets';
import { colors } from '@/src/theme/colors';

const BUTTON_SIZE = 48;
const ICON_SIZE = 24;

type FaceIdLoginButtonProps = {
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel: string;
};

export function FaceIdLoginButton({
  onPress,
  disabled = false,
  accessibilityLabel,
}: FaceIdLoginButtonProps) {
  return (
    <AppPressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, disabled && styles.disabled]}
    >
      <Image
        resizeMode="contain"
        source={authImages.faceId}
        style={styles.icon}
        tintColor="#333333"
      />
    </AppPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  disabled: {
    opacity: 0.6,
  },
});
