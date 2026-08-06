import { Text, TextInput } from 'react-native';

import { fontFamily } from '@/src/theme/typography';

type TextLikeComponent = {
  defaultProps?: {
    style?: unknown;
  };
};

function applyDefaultFontFamily(Component: TextLikeComponent) {
  Component.defaultProps = Component.defaultProps ?? {};
  const existingStyle = Component.defaultProps.style;

  Component.defaultProps.style = [{ fontFamily }, existingStyle].filter(Boolean);
}

export function setupGlobalTextStyles() {
  applyDefaultFontFamily(Text as unknown as TextLikeComponent);
  applyDefaultFontFamily(TextInput as unknown as TextLikeComponent);
}

setupGlobalTextStyles();
