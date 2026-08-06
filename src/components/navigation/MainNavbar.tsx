import { DrawerToggleButton } from 'expo-router/drawer';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NavbarAvatar } from '@/src/components/navigation/NavbarAvatar';
import { NavbarQrButton } from '@/src/components/navigation/NavbarQrButton';
import {
  NAVBAR_CONTENT_HEIGHT,
  NAVBAR_HORIZONTAL_PADDING,
  NAVBAR_RIGHT_ACTIONS_GAP,
} from '@/src/components/navigation/navbarConfig';
import { colors } from '@/src/theme/colors';

type MainNavbarProps = {
  options: {
    title?: string;
    headerTitle?: unknown;
  };
  route: {
    name: string;
  };
};

function resolveHeaderTitle({ options, route }: MainNavbarProps) {
  if (typeof options.headerTitle === 'string') {
    return options.headerTitle;
  }

  if (options.title) {
    return options.title;
  }

  return route.name;
}

export function MainNavbar(props: MainNavbarProps) {
  const insets = useSafeAreaInsets();
  const title = resolveHeaderTitle(props);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          height: insets.top + NAVBAR_CONTENT_HEIGHT,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.leftActions}>
          <DrawerToggleButton tintColor={colors.headerOnPrimary} />
        </View>

        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>

        <View style={styles.rightActions}>
          <NavbarAvatar />
          <NavbarQrButton />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: NAVBAR_HORIZONTAL_PADDING,
    gap: 8,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 48,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
    color: colors.headerOnPrimary,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: NAVBAR_RIGHT_ACTIONS_GAP,
    minWidth: 96,
  },
});
