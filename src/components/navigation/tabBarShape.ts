const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 86;

const TOP_Y = 30;
const NOTCH_BOTTOM_Y = 57;
const CORNER_RADIUS = 22;
const NOTCH_HALF_WIDTH = 33;

function clamp01(value: number) {
  'worklet';

  return Math.max(0, Math.min(1, value));
}

function buildFlatTabBarPath(
  width: number,
  height: number,
  topY: number,
  cornerR: number,
) {
  'worklet';

  return [
    `M 0 ${height}`,
    `L 0 ${topY + cornerR}`,
    `Q 0 ${topY} ${cornerR} ${topY}`,
    `L ${width - cornerR} ${topY}`,
    `Q ${width} ${topY} ${width} ${topY + cornerR}`,
    `L ${width} ${height}`,
    'Z',
  ].join(' ');
}

export function buildTabBarPath(
  width: number,
  height: number,
  notchCenterX: number,
  notchDepth = 1,
): string {
  'worklet';

  const depth = clamp01(notchDepth);
  const scaleX = width / DESIGN_WIDTH;
  const scaleY = height / DESIGN_HEIGHT;

  const topY = TOP_Y * scaleY;
  const maxNotchY = NOTCH_BOTTOM_Y * scaleY;
  const cornerR = CORNER_RADIUS * scaleX;
  const halfW = NOTCH_HALF_WIDTH * scaleX;

  if (depth <= 0.001) {
    return buildFlatTabBarPath(width, height, topY, cornerR);
  }

  const notchY = topY + (maxNotchY - topY) * depth;
  const notchLeft = notchCenterX - halfW;
  const notchRight = notchCenterX + halfW;
  const controlOffset = halfW * 0.55;

  return [
    `M 0 ${height}`,
    `L 0 ${topY + cornerR}`,
    `Q 0 ${topY} ${cornerR} ${topY}`,
    `L ${notchLeft - controlOffset * 0.35} ${topY}`,
    `C ${notchLeft + controlOffset * 0.15} ${topY}`,
    ` ${notchCenterX - controlOffset * 0.35} ${notchY}`,
    ` ${notchCenterX} ${notchY}`,
    `C ${notchCenterX + controlOffset * 0.35} ${notchY}`,
    ` ${notchRight - controlOffset * 0.15} ${topY}`,
    ` ${notchRight + controlOffset * 0.35} ${topY}`,
    `L ${width - cornerR} ${topY}`,
    `Q ${width} ${topY} ${width} ${topY + cornerR}`,
    `L ${width} ${height}`,
    'Z',
  ].join(' ');
}

export function getTabSlotCenterX(
  slotIndex: number,
  slotWidth: number,
  sideInset: number,
) {
  'worklet';

  return sideInset + slotWidth * slotIndex + slotWidth / 2;
}

export const TAB_BAR_DROP_SPRING = {
  damping: 17,
  stiffness: 240,
  mass: 0.9,
} as const;
