import type { ComponentType } from 'react';
import type { SvgProps } from 'react-native-svg';

import BellIcon from '@/assets/svg/solar--bell-bold.svg';
import CalendarIcon from '@/assets/svg/solar--calendar-bold.svg';
import GraduateCapIcon from '@/assets/svg/game-icons--graduate-cap.svg';
import HomeIcon from '@/assets/svg/tabler--home-filled.svg';
import UserIcon from '@/assets/svg/solar--user-bold.svg';

import { colors } from '@/src/theme/colors';

/** Visual height of the tab bar shape (Figma base). */
export const TAB_BAR_HEIGHT = 86;
export const TAB_BAR_FAB_SIZE = 54;
export const TAB_BAR_ICON_SIZE = 30;
export const TAB_BAR_FAB_ICON_SIZE = 32;
/** How far the FAB sits above the bar top edge when settled. */
export const TAB_BAR_FAB_LIFT = 22;
/** Padding from the bottom of the bar shape to inactive icon centers. */
export const TAB_BAR_ITEM_PADDING = 10;

export const TAB_BAR_INACTIVE_COLOR = '#DDDDDD';

export type MainTabRouteName =
  | 'fixtures'
  | 'leagues'
  | 'index'
  | 'notifications'
  | 'account';

export type MainTabItem = {
  routeName: MainTabRouteName;
  Icon: ComponentType<SvgProps>;
};

/** Left → center (Home) → right. */
export const MAIN_TAB_ITEMS: MainTabItem[] = [
  { routeName: 'fixtures', Icon: CalendarIcon },
  { routeName: 'leagues', Icon: GraduateCapIcon },
  { routeName: 'index', Icon: HomeIcon },
  { routeName: 'notifications', Icon: BellIcon },
  { routeName: 'account', Icon: UserIcon },
];

export function getTabBarOuterHeight(bottomInset: number) {
  return TAB_BAR_HEIGHT + bottomInset;
}
