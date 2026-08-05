import { render } from '@testing-library/react-native';

import HomeScreen from '@/app/(drawer)/(main)/(tabs)/index';

describe('HomeScreen', () => {
  it('renders the home placeholder', async () => {
    const { getByText } = await render(<HomeScreen />);

    expect(getByText('Home')).toBeOnTheScreen();
    expect(getByText(/open the sidebar/i)).toBeOnTheScreen();
  });
});
