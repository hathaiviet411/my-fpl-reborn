import { useEffect } from 'react';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import {
  TAB_BAR_DROP_SPRING,
  buildTabBarPath,
} from '@/src/components/navigation/tabBarShape';
import { colors } from '@/src/theme/colors';

const AnimatedPath = Animated.createAnimatedComponent(Path);

type AnimatedTabBarBackgroundProps = {
  width: number;
  height: number;
  notchCenterX: number;
  activeVisualIndex: number;
};

export function AnimatedTabBarBackground({
  width,
  height,
  notchCenterX,
  activeVisualIndex,
}: AnimatedTabBarBackgroundProps) {
  const centerX = useSharedValue(notchCenterX);
  const depth = useSharedValue(1);

  useEffect(() => {
    centerX.value = notchCenterX;
    depth.value = 0;
    depth.value = withSpring(1, TAB_BAR_DROP_SPRING);
  }, [activeVisualIndex, centerX, depth, notchCenterX]);

  const animatedProps = useAnimatedProps(() => ({
    d: buildTabBarPath(width, height, centerX.value, depth.value),
  }));

  return (
    <Svg height={height} width={width}>
      <AnimatedPath animatedProps={animatedProps} fill={colors.white} />
    </Svg>
  );
}
