import { render } from '@testing-library/react-native';

import { SidebarSourceRow } from '@/src/components/navigation/SidebarSourceRow';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

const homeItem = {
  label: 'Home',
  route: '/' as const,
  icon: 'home-outline' as const,
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
