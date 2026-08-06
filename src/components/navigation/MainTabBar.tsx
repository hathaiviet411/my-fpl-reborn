import { useMemo } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppPressable } from '@/src/components/ui/AppPressable';
import { AnimatedTabBarBackground } from '@/src/components/navigation/AnimatedTabBarBackground';
import { TabBarFab } from '@/src/components/navigation/TabBarFab';
import { TabBarIcon } from '@/src/components/navigation/TabBarIcon';
import {
  MAIN_TAB_ITEMS,
  TAB_BAR_HEIGHT,
  TAB_BAR_ICON_SIZE,
  TAB_BAR_INACTIVE_COLOR,
  TAB_BAR_ITEM_PADDING,
  getTabBarOuterHeight,
  type MainTabRouteName,
} from '@/src/components/navigation/tabBarConfig';
import { getTabSlotCenterX } from '@/src/components/navigation/tabBarShape';
import { colors } from '@/src/theme/colors';

type TabRoute = {
  key: string;
  name: string;
  params?: object;
};

type MainTabBarProps = {
  state: {
    index: number;
    routes: TabRoute[];
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any;
};

function getRouteIndex(routes: TabRoute[], routeName: MainTabRouteName) {
  return routes.findIndex((route) => route.name === routeName);
}

function getActiveVisualIndex(
  routes: TabRoute[],
  activeRouteIndex: number,
) {
  const visualIndex = MAIN_TAB_ITEMS.findIndex((item) => {
    const routeIndex = getRouteIndex(routes, item.routeName);
    return routeIndex !== -1 && activeRouteIndex === routeIndex;
  });

  return visualIndex === -1 ? 2 : visualIndex;
}

export function MainTabBar({ state, navigation }: MainTabBarProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const sideInset = 12;
  const slotWidth = (width - sideInset * 2) / MAIN_TAB_ITEMS.length;
  const outerHeight = getTabBarOuterHeight(insets.bottom);

  const activeVisualIndex = getActiveVisualIndex(state.routes, state.index);
  const notchCenterX = useMemo(
    () => getTabSlotCenterX(activeVisualIndex, slotWidth, sideInset),
    [activeVisualIndex, sideInset, slotWidth],
  );

  return (
    <View
      pointerEvents="box-none"
      style={[styles.container, { width, height: outerHeight }]}
    >
      <View style={[styles.bar, { width, height: outerHeight }]}>
        <View style={[styles.backgroundShadow, { height: TAB_BAR_HEIGHT }]}>
          <AnimatedTabBarBackground
            activeVisualIndex={activeVisualIndex}
            height={TAB_BAR_HEIGHT}
            notchCenterX={notchCenterX}
            width={width}
          />
        </View>
        <View
          style={[
            styles.safeAreaFill,
            { top: TAB_BAR_HEIGHT, height: insets.bottom },
          ]}
        />

        <View
          style={[
            styles.itemsRow,
            {
              paddingHorizontal: sideInset,
              height: TAB_BAR_HEIGHT,
              bottom: insets.bottom,
            },
          ]}
        >
          {MAIN_TAB_ITEMS.map((item) => {
            const routeIndex = getRouteIndex(state.routes, item.routeName);

            if (routeIndex === -1) {
              return null;
            }

            const route = state.routes[routeIndex];
            const isFocused = state.index === routeIndex;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <View
                key={item.routeName}
                style={[styles.slot, { width: slotWidth }]}
              >
                <TabBarFab
                  Icon={item.Icon}
                  isFocused={isFocused}
                  onPress={onPress}
                />

                {!isFocused ? (
                  <AppPressable
                    accessibilityRole="button"
                    accessibilityState={{ selected: false }}
                    onPress={onPress}
                    style={[
                      styles.pressable,
                      { paddingBottom: TAB_BAR_ITEM_PADDING },
                    ]}
                  >
                    <View style={styles.inactiveIcon}>
                      <TabBarIcon
                        Icon={item.Icon}
                        color={TAB_BAR_INACTIVE_COLOR}
                        size={TAB_BAR_ICON_SIZE}
                      />
                    </View>
                  </AppPressable>
                ) : null}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  backgroundShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    shadowColor: '#32343E',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 12,
  },
  safeAreaFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: colors.white,
  },
  itemsRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  slot: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
  },
  pressable: {
    minWidth: 44,
    minHeight: TAB_BAR_ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
