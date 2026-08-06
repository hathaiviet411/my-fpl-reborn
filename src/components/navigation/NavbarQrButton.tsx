import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import {
  NAVBAR_ACTION_ICON_SIZE,
  NAVBAR_ACTION_SIZE,
  NAVBAR_AVATAR_BORDER_WIDTH,
} from '@/src/components/navigation/navbarConfig';
import { AppPressable } from '@/src/components/ui/AppPressable';
import { colors } from '@/src/theme/colors';

export function NavbarQrButton() {
  const router = useRouter();
  const { t } = useTranslation();

  const handlePress = () => {
    router.push('/(drawer)/(main)/qr-scanner');
  };

  return (
    <AppPressable
      accessibilityLabel={t('navigation.qrScan')}
      accessibilityRole="button"
      hitSlop={4}
      onPress={handlePress}
      style={styles.button}
    >
      <MaterialCommunityIcons
        color="#000000"
        name="qrcode-scan"
        size={NAVBAR_ACTION_ICON_SIZE}
      />
    </AppPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: NAVBAR_ACTION_SIZE,
    height: NAVBAR_ACTION_SIZE,
    borderRadius: NAVBAR_ACTION_SIZE / 2,
    borderWidth: NAVBAR_AVATAR_BORDER_WIDTH,
    borderColor: colors.white,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
