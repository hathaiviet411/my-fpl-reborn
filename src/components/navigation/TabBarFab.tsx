import { useEffect } from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import type { ComponentType } from 'react';
import type { SvgProps } from 'react-native-svg';

import { AppPressable } from '@/src/components/ui/AppPressable';
import { TabBarIcon } from '@/src/components/navigation/TabBarIcon';
import { TAB_BAR_DROP_SPRING } from '@/src/components/navigation/tabBarShape';
import {
  TAB_BAR_FAB_ICON_SIZE,
  TAB_BAR_FAB_LIFT,
  TAB_BAR_FAB_SIZE,
  TAB_BAR_ICON_SIZE,
  TAB_BAR_ITEM_PADDING,
} from '@/src/components/navigation/tabBarConfig';
import { colors } from '@/src/theme/colors';

const DROP_OFFSET = 20;

const INACTIVE_ICON_CENTER =
  TAB_BAR_ITEM_PADDING + TAB_BAR_ICON_SIZE / 2;
const FAB_SETTLED_BOTTOM =
  INACTIVE_ICON_CENTER - TAB_BAR_FAB_SIZE / 2 + TAB_BAR_FAB_LIFT;

type TabBarFabProps = {
  Icon: ComponentType<SvgProps>;
  isFocused: boolean;
  onPress: () => void;
};

export function TabBarFab({ Icon, isFocused, onPress }: TabBarFabProps) {
  const dropProgress = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    if (!isFocused) {
      dropProgress.value = 0;
      return;
    }

    dropProgress.value = 0;
    dropProgress.value = withSpring(1, TAB_BAR_DROP_SPRING);
  }, [dropProgress, isFocused]);

  const animatedFabStyle = useAnimatedStyle(() => ({
    bottom: interpolate(
      dropProgress.value,
      [0, 1],
      [FAB_SETTLED_BOTTOM + DROP_OFFSET, FAB_SETTLED_BOTTOM],
    ),
    transform: [
      {
        scale: interpolate(dropProgress.value, [0, 0.7, 1], [0.88, 1.04, 1]),
      },
    ],
    opacity: interpolate(dropProgress.value, [0, 0.2, 1], [0, 0.85, 1]),
  }));

  if (!isFocused) {
    return null;
  }

  return (
    <AppPressable
      accessibilityRole="button"
      accessibilityState={{ selected: true }}
      onPress={onPress}
      style={styles.pressable}
    >
      <Animated.View
        style={[
          styles.fab,
          {
            width: TAB_BAR_FAB_SIZE,
            height: TAB_BAR_FAB_SIZE,
            borderRadius: TAB_BAR_FAB_SIZE / 2,
          },
          animatedFabStyle,
        ]}
      >
        <TabBarIcon
          Icon={Icon}
          color={colors.headerOnPrimary}
          size={TAB_BAR_FAB_ICON_SIZE}
        />
      </Animated.View>
    </AppPressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 10,
  },
});
