import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MainNavbar } from '@/src/components/navigation/MainNavbar';
import { MainTabBar } from '@/src/components/navigation/MainTabBar';
import { getTabBarOuterHeight } from '@/src/components/navigation/tabBarConfig';

export default function TabsLayout() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const tabBarHeight = getTabBarOuterHeight(insets.bottom);

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: true,
        header: (props) => <MainNavbar {...props} />,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: tabBarHeight,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
      tabBar={(props) => (
        <MainTabBar navigation={props.navigation} state={props.state} />
      )}
    >
      <Tabs.Screen
        name="fixtures"
        options={{
          title: t('navigation.classSchedule'),
        }}
      />
      <Tabs.Screen
        name="leagues"
        options={{
          title: t('navigation.grades'),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: t('navigation.home'),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: t('navigation.notifications'),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: t('navigation.account'),
        }}
      />
      <Tabs.Screen
        name="squad"
        options={{
          href: null,
          title: t('navigation.squad'),
        }}
      />
    </Tabs>
  );
}
