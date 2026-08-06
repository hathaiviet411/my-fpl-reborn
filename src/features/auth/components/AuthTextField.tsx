import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

import { AppPressable } from '@/src/components/ui/AppPressable';
import { AuthSvgIcon } from '@/src/components/ui/AuthSvgIcon';
import { authIcons } from '@/src/features/auth/assets';
import { colors } from '@/src/theme/colors';

const EyeOffIcon = authIcons.eyeOff;

type AuthTextFieldProps = TextInputProps & {
  isPassword?: boolean;
};

export function AuthTextField({
  isPassword = false,
  style,
  ...props
}: AuthTextFieldProps) {
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholderTextColor={colors.grey}
        secureTextEntry={secureTextEntry}
        style={[styles.input, style]}
        {...props}
      />
      {isPassword ? (
        <AppPressable
          accessibilityRole="button"
          accessibilityLabel="Toggle password visibility"
          hitSlop={8}
          onPress={() => setSecureTextEntry((value) => !value)}
          style={styles.iconButton}
        >
          <AuthSvgIcon
            Icon={EyeOffIcon}
            fallback={
              <Ionicons color={colors.grey} name="eye-off-outline" size={16} />
            }
            height={16}
            width={16}
          />
        </AppPressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  input: {
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.stroke,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    fontSize: 14,
    fontWeight: '500',
    color: colors.inputText,
    shadowColor: '#E4E5E7',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.24,
    shadowRadius: 2,
    elevation: 1,
  },
  iconButton: {
    position: 'absolute',
    right: 14,
    top: 15,
  },
});
