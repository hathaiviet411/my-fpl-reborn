import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useTranslation } from 'react-i18next';

import { DrawerContent } from '@/src/components/navigation/DrawerContent';
import { useAuthGuard } from '@/src/features/auth/hooks/useAuthGuard';
import { colors } from '@/src/theme/colors';

export default function DrawerLayout() {
  const { t } = useTranslation();
  const { isAuthenticated, isHydrated } = useAuthGuard({ mode: 'requireAuth' });

  if (isHydrated && !isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Drawer
      drawerContent={({ navigation }) => (
        <DrawerContent navigation={navigation} />
      )}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          width: 280,
          backgroundColor: 'transparent',
        },
        overlayColor: 'rgba(0, 0, 0, 0.18)',
        drawerActiveTintColor: colors.primary,
      }}
    >
      <Drawer.Screen
        name="(main)"
        options={{
          drawerLabel: t('navigation.home'),
          title: t('navigation.home'),
        }}
      />
    </Drawer>
  );
}
