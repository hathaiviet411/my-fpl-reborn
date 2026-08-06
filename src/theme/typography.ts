import { Platform, StyleSheet } from 'react-native';

import { colors } from '@/src/theme/colors';

export const fontFamily = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: 'System',
}) as string;

export const textStyles = StyleSheet.create({
  textNormal: {
    fontFamily,
    fontSize: 16,
    color: colors.textNormal,
  },
  textExtraBold: {
    fontFamily,
    fontSize: 24,
    color: colors.textExtraBold,
    fontWeight: '900',
  },
});

export const typography = {
  fontFamily,
  textNormal: textStyles.textNormal,
  textExtraBold: textStyles.textExtraBold,
} as const;
