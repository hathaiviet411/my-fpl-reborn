import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { GradientView } from '@/src/components/ui/GradientView';
import { colors } from '@/src/theme/colors';

type BlobProps = {
  size: number;
  color: string;
  opacity?: number;
  style?: StyleProp<ViewStyle>;
};

function Blob({ size, color, opacity = 1, style }: BlobProps) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          opacity,
        },
        style,
      ]}
    />
  );
}

export function LoginBackground() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <GradientView
        colors={[colors.backgroundTop, colors.backgroundBottom]}
        style={StyleSheet.absoluteFill}
      />
      <Blob color="#EBC894" opacity={0.72} size={320} style={styles.ellipseTopLeft} />
      <Blob color="#B49EF4" opacity={0.68} size={420} style={styles.ellipseBottomRight} />
      <Blob color="#FFFFFF" opacity={0.5} size={220} style={styles.ellipseCard} />
    </View>
  );
}

const styles = StyleSheet.create({
  ellipseTopLeft: {
    position: 'absolute',
    top: -120,
    left: -140,
  },
  ellipseBottomRight: {
    position: 'absolute',
    bottom: -180,
    right: -220,
  },
  ellipseCard: {
    position: 'absolute',
    top: -40,
    right: -60,
  },
});
