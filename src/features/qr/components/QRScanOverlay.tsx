import { StyleSheet, View } from 'react-native';
import Svg, { Defs, Mask, Rect } from 'react-native-svg';

import {
  getQRScanFrameSize,
  QR_SCAN_FRAME_RADIUS,
  QR_SCANNER_CORNER_LENGTH,
  QR_SCANNER_CORNER_OUTSET,
  QR_SCANNER_CORNER_RADIUS,
  QR_SCANNER_CORNER_WIDTH,
  QR_SCANNER_OVERLAY_COLOR,
} from '@/src/features/qr/qrScannerConfig';
import { colors } from '@/src/theme/colors';

const MASK_ID = 'qr-scanner-cutout-mask';

type QRScanOverlayProps = {
  width: number;
  height: number;
};

function Corner({ style }: { style: object }) {
  return <View style={[styles.corner, style]} />;
}

export function QRScanOverlay({ width, height }: QRScanOverlayProps) {
  if (width <= 0 || height <= 0) {
    return null;
  }

  const frameSize = getQRScanFrameSize(width);
  const frameLeft = (width - frameSize) / 2;
  const frameTop = (height - frameSize) / 2;
  const cornerOutset = QR_SCANNER_CORNER_OUTSET;
  const cornerFrameSize = frameSize + cornerOutset * 2;
  const cornerFrameLeft = frameLeft - cornerOutset;
  const cornerFrameTop = frameTop - cornerOutset;

  return (
    <View pointerEvents="none" style={[styles.root, { width, height }]}>
      <Svg height={height} style={StyleSheet.absoluteFill} width={width}>
        <Defs>
          <Mask id={MASK_ID}>
            <Rect fill="#fff" height={height} width={width} x={0} y={0} />
            <Rect
              fill="#000"
              height={frameSize}
              rx={QR_SCAN_FRAME_RADIUS}
              ry={QR_SCAN_FRAME_RADIUS}
              width={frameSize}
              x={frameLeft}
              y={frameTop}
            />
          </Mask>
        </Defs>
        <Rect
          fill={QR_SCANNER_OVERLAY_COLOR}
          height={height}
          mask={`url(#${MASK_ID})`}
          width={width}
          x={0}
          y={0}
        />
      </Svg>

      <View
        style={[
          styles.frame,
          {
            top: cornerFrameTop,
            left: cornerFrameLeft,
            width: cornerFrameSize,
            height: cornerFrameSize,
          },
        ]}
      >
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
    position: 'absolute',
    top: 0,
    left: 0,
  },
  frame: {
    position: 'absolute',
  },
  corner: {
    position: 'absolute',
    width: QR_SCANNER_CORNER_LENGTH,
    height: QR_SCANNER_CORNER_LENGTH,
    borderColor: colors.white,
  },
  cornerTopLeft: {
    borderTopWidth: QR_SCANNER_CORNER_WIDTH,
    borderLeftWidth: QR_SCANNER_CORNER_WIDTH,
    borderTopLeftRadius: QR_SCANNER_CORNER_RADIUS,
  },
  cornerTopRight: {
    borderTopWidth: QR_SCANNER_CORNER_WIDTH,
    borderRightWidth: QR_SCANNER_CORNER_WIDTH,
    borderTopRightRadius: QR_SCANNER_CORNER_RADIUS,
  },
  cornerBottomLeft: {
    borderBottomWidth: QR_SCANNER_CORNER_WIDTH,
    borderLeftWidth: QR_SCANNER_CORNER_WIDTH,
    borderBottomLeftRadius: QR_SCANNER_CORNER_RADIUS,
  },
  cornerBottomRight: {
    borderBottomWidth: QR_SCANNER_CORNER_WIDTH,
    borderRightWidth: QR_SCANNER_CORNER_WIDTH,
    borderBottomRightRadius: QR_SCANNER_CORNER_RADIUS,
  },
  topLeft: {
    top: 0,
    left: 0,
  },
  topRight: {
    top: 0,
    right: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
  },
});
