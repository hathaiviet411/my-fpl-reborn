import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

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

export const sidebarSections: SidebarSection[] = [
  {
    title: 'Navigation',
    items: [
      { label: 'Home', route: '/', icon: 'home-outline' },
      { label: 'Squad', route: '/squad', icon: 'people-outline' },
      { label: 'Fixtures', route: '/fixtures', icon: 'calendar-outline' },
      { label: 'Leagues', route: '/leagues', icon: 'trophy-outline' },
    ],
  },
];
