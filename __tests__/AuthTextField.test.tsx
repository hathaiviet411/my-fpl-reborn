import { render } from '@testing-library/react-native';

import { AuthTextField } from '@/src/features/auth/components/AuthTextField';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('@/src/utils/hasNativeSvg', () => ({
  hasNativeSvg: () => false,
}));

jest.mock('@/src/features/auth/assets', () => ({
  authIcons: {
    eyeOff: 'EyeOffIcon',
  },
}));

describe('AuthTextField', () => {
  it('renders email input', async () => {
    const { getByDisplayValue } = await render(
      <AuthTextField onChangeText={() => {}} value="test@example.com" />,
    );

    expect(getByDisplayValue('test@example.com')).toBeOnTheScreen();
  });

  it('renders password input', async () => {
    const { getByDisplayValue } = await render(
      <AuthTextField isPassword onChangeText={() => {}} value="secret" />,
    );

    expect(getByDisplayValue('secret')).toBeOnTheScreen();
  });
});
