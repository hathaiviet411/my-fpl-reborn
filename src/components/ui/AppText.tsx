import { Text, type TextProps, type TextStyle } from 'react-native';

import { textStyles } from '@/src/theme/typography';

export type AppTextVariant = 'normal' | 'extraBold';

const variantStyleMap: Record<AppTextVariant, TextStyle> = {
  normal: textStyles.textNormal,
  extraBold: textStyles.textExtraBold,
};

export type AppTextProps = TextProps & {
  variant?: AppTextVariant;
};

export function AppText({ variant, style, ...props }: AppTextProps) {
  const variantStyle = variant ? variantStyleMap[variant] : undefined;

  return <Text style={[variantStyle, style]} {...props} />;
}
