import type { ComponentType } from 'react';
import { render } from '@testing-library/react-native';
import type { SvgProps } from 'react-native-svg';

import { SidebarSourceRow } from '@/src/components/navigation/SidebarSourceRow';

const MockIcon: ComponentType<SvgProps> = () => null;

const homeItem = {
  label: 'Home',
  route: '/' as const,
  Icon: MockIcon,
};

describe('SidebarSourceRow', () => {
  it('renders selected state', async () => {
    const { getByText } = await render(
      <SidebarSourceRow item={homeItem} selected onPress={() => {}} />,
    );

    expect(getByText('Home')).toBeOnTheScreen();
  });

  it('renders unselected state', async () => {
    const { getByText } = await render(
      <SidebarSourceRow item={homeItem} selected={false} onPress={() => {}} />,
    );

    expect(getByText('Home')).toBeOnTheScreen();
  });
});
