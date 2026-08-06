import { StyleSheet, View } from 'react-native';

import { colors } from '@/src/theme/colors';

const FRAME_SIZE = 240;
const CORNER_LENGTH = 28;
const CORNER_WIDTH = 4;

function Corner({ style }: { style: object }) {
  return <View style={[styles.corner, style]} />;
}

export function QRScanOverlay() {
  return (
    <View pointerEvents="none" style={styles.root}>
      <View style={styles.frame}>
        <Corner style={[styles.cornerTopLeft, styles.topLeft]} />
        <Corner style={[styles.cornerTopRight, styles.topRight]} />
        <Corner style={[styles.cornerBottomLeft, styles.bottomLeft]} />
        <Corner style={[styles.cornerBottomRight, styles.bottomRight]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    borderRadius: 16,
  },
  corner: {
    position: 'absolute',
    width: CORNER_LENGTH,
    height: CORNER_LENGTH,
    borderColor: colors.primary,
  },
  cornerTopLeft: {
    borderTopWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
    borderTopLeftRadius: 12,
  },
  cornerTopRight: {
    borderTopWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
    borderTopRightRadius: 12,
  },
  cornerBottomLeft: {
    borderBottomWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
    borderBottomLeftRadius: 12,
  },
  cornerBottomRight: {
    borderBottomWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
    borderBottomRightRadius: 12,
  },
  topLeft: {
    top: -1,
    left: -1,
  },
  topRight: {
    top: -1,
    right: -1,
  },
  bottomLeft: {
    bottom: -1,
    left: -1,
  },
  bottomRight: {
    bottom: -1,
    right: -1,
  },
});
