import { BlurView } from 'expo-blur';
import { NativeModules, Platform, StyleSheet, View } from 'react-native';

import { colors } from '@/src/theme/colors';

function isBlurNativeModuleAvailable() {
  return (
    Platform.OS !== 'web' &&
    (NativeModules.ExpoBlurView != null || NativeModules.ExpoBlur != null)
  );
}

export function SidebarBackdrop() {
  if (isBlurNativeModuleAvailable()) {
    return (
      <BlurView
        intensity={Platform.OS === 'ios' ? 72 : 48}
        style={StyleSheet.absoluteFill}
        tint={Platform.OS === 'ios' ? 'systemChromeMaterialLight' : 'light'}
      />
    );
  }

  return <View style={[StyleSheet.absoluteFill, styles.fallback]} />;
}

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: colors.primaryMuted,
  },
});
