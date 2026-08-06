import type { ComponentType } from 'react';
import type { TFunction } from 'i18next';
import type { SvgProps } from 'react-native-svg';

import BellIcon from '@/assets/svg/solar--bell-bold.svg';
import CalendarIcon from '@/assets/svg/solar--calendar-bold.svg';
import GraduateCapIcon from '@/assets/svg/game-icons--graduate-cap.svg';
import HomeIcon from '@/assets/svg/tabler--home-filled.svg';
import UserIcon from '@/assets/svg/solar--user-bold.svg';

export type SidebarRoute =
  | '/'
  | '/fixtures'
  | '/leagues'
  | '/notifications'
  | '/account';

export type SidebarItem = {
  label: string;
  route: SidebarRoute;
  Icon: ComponentType<SvgProps>;
};

export type SidebarSection = {
  title: string;
  items: SidebarItem[];
};

const SIDEBAR_ICON_SIZE = 22;

export { SIDEBAR_ICON_SIZE };

export function getSidebarSections(t: TFunction): SidebarSection[] {
  return [
    {
      title: t('navigation.navigation'),
      items: [
        { label: t('navigation.home'), route: '/', Icon: HomeIcon },
        {
          label: t('navigation.classSchedule'),
          route: '/fixtures',
          Icon: CalendarIcon,
        },
        {
          label: t('navigation.grades'),
          route: '/leagues',
          Icon: GraduateCapIcon,
        },
        {
          label: t('navigation.notifications'),
          route: '/notifications',
          Icon: BellIcon,
        },
        {
          label: t('navigation.account'),
          route: '/account',
          Icon: UserIcon,
        },
      ],
    },
  ];
}
