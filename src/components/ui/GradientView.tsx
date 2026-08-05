import type { ComponentProps, ReactNode } from 'react';
import {
  StyleSheet,
  UIManager,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

type Point = { x: number; y: number };

export type GradientViewProps = {
  colors: readonly [string, string, ...string[]];
  start?: Point;
  end?: Point;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

type ExpoLinearGradientProps = GradientViewProps &
  Omit<ComponentProps<typeof View>, 'style'>;

let LinearGradientComponent: React.ComponentType<ExpoLinearGradientProps> | null =
  null;
let checkedNativeGradient = false;

function hasLinearGradientNative(): boolean {
  return UIManager.getViewManagerConfig?.('ExpoLinearGradient') != null;
}

function getLinearGradientComponent():
  | React.ComponentType<ExpoLinearGradientProps>
  | null {
  if (checkedNativeGradient) return LinearGradientComponent;
  checkedNativeGradient = true;

  if (!hasLinearGradientNative()) {
    return null;
  }

  try {
    const { LinearGradient } = require('expo-linear-gradient') as {
      LinearGradient: React.ComponentType<ExpoLinearGradientProps>;
    };
    LinearGradientComponent = LinearGradient;
    return LinearGradientComponent;
  } catch {
    return null;
  }
}

export function GradientView({
  colors,
  start,
  end,
  style,
  children,
  ...rest
}: GradientViewProps) {
  const Gradient = getLinearGradientComponent();

  if (Gradient) {
    return (
      <Gradient colors={colors} end={end} start={start} style={style} {...rest}>
        {children}
      </Gradient>
    );
  }

  return (
    <View style={[style, { backgroundColor: colors[0] }]} {...rest}>
      {colors.length > 1 ? (
        <View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, styles.blendLayer, { backgroundColor: colors.at(-1) }]}
        />
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  blendLayer: {
    opacity: 0.45,
  },
});
