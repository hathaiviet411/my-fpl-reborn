import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { AuthSvgIcon } from '@/src/components/ui/AuthSvgIcon';
import { authIcons } from '@/src/features/auth/assets';
import { colors } from '@/src/theme/colors';
import { hasNativeSvg } from '@/src/utils/hasNativeSvg';

const DividerLine = authIcons.dividerLine;

const SOCIAL_ITEMS = [
  {
    key: 'google',
    Icon: authIcons.google,
    fallback: <AntDesign color="#4285F4" name="google" size={18} />,
  },
  {
    key: 'facebook',
    Icon: authIcons.facebook,
    fallback: <FontAwesome color="#1877F2" name="facebook" size={18} />,
  },
  {
    key: 'apple',
    Icon: authIcons.apple,
    fallback: <Ionicons color="#000000" name="logo-apple" size={18} />,
  },
  {
    key: 'phone',
    Icon: authIcons.phone,
    fallback: <Ionicons color={colors.grey} name="call-outline" size={18} />,
  },
] as const;

function showComingSoon() {
  Alert.alert('Coming soon', 'Social login is not available yet.');
}

function Divider() {
  if (hasNativeSvg()) {
    return <DividerLine height={1} style={styles.divider} />;
  }

  return <View style={[styles.divider, styles.dividerFallback]} />;
}

export function SocialLoginRow() {
  return (
    <View style={styles.container}>
      <View style={styles.dividerRow}>
        <Divider />
        <Text style={styles.dividerText}>Or login with</Text>
        <Divider />
      </View>

      <View style={styles.buttonsRow}>
        {SOCIAL_ITEMS.map(({ key, Icon, fallback }) => (
          <Pressable
            key={key}
            accessibilityRole="button"
            onPress={showComingSoon}
            style={styles.socialButton}
          >
            <AuthSvgIcon
              Icon={Icon}
              fallback={fallback}
              height={18}
              width={18}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 24,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 15,
  },
  socialButton: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.socialBorder,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
