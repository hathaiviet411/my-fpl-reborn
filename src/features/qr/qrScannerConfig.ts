/** Layout tokens derived from Figma scanner screen (585×1266 reference). */
export const QR_SCANNER_OVERLAY_COLOR = 'rgba(0, 0, 0, 0.68)';

/** Rounded cutout radius — must match corner bracket outer radius. */
export const QR_SCAN_FRAME_RADIUS = 16;

export const QR_SCANNER_CORNER_LENGTH = 42;
export const QR_SCANNER_CORNER_WIDTH = 4;
export const QR_SCANNER_CORNER_RADIUS = QR_SCAN_FRAME_RADIUS;

/** Gap between scan cutout edge and white corner brackets. */
export const QR_SCANNER_CORNER_OUTSET = 15;

export function getQRScanFrameSize(screenWidth: number) {
  return Math.min(Math.round(screenWidth * 0.72), 280);
}

export const QR_SCANNER_HORIZONTAL_PADDING = 15;
