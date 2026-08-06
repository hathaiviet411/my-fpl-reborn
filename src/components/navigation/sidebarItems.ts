import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';
import type { TFunction } from 'i18next';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

export type SidebarItem = {
  label: string;
  route: '/' | '/squad' | '/fixtures' | '/leagues';
  icon: IoniconName;
};

export type SidebarSection = {
  title: string;
  items: SidebarItem[];
};

export function getSidebarSections(t: TFunction): SidebarSection[] {
  return [
    {
      title: t('navigation.navigation'),
      items: [
        { label: t('navigation.home'), route: '/', icon: 'home-outline' },
        { label: t('navigation.squad'), route: '/squad', icon: 'people-outline' },
        {
          label: t('navigation.fixtures'),
          route: '/fixtures',
          icon: 'calendar-outline',
        },
        {
          label: t('navigation.leagues'),
          route: '/leagues',
          icon: 'trophy-outline',
        },
      ],
    },
  ];
}
