import { usePathname, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppPressable } from '@/src/components/ui/AppPressable';
import { LanguageSwitcher } from '@/src/components/i18n/LanguageSwitcher';
import { useAuthStore } from '@/src/stores/authStore';
import { colors } from '@/src/theme/colors';

import { SidebarBackdrop } from './SidebarBackdrop';
import { SidebarSourceRow } from './SidebarSourceRow';
import { getSidebarSections } from './sidebarItems';

type DrawerContentProps = {
  navigation: {
    closeDrawer: () => void;
  };
};

function isRouteSelected(pathname: string, route: string) {
  if (route === '/') {
    return pathname === '/' || pathname === '/index';
  }

  return pathname === route || pathname.startsWith(`${route}/`);
}

export function DrawerContent({ navigation }: DrawerContentProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const signOut = useAuthStore((state) => state.signOut);
  const user = useAuthStore((state) => state.user);
  const sidebarSections = getSidebarSections(t);

  const handleSignOut = async () => {
    navigation.closeDrawer();
    await signOut();
    router.replace('/login');
  };

  return (
    <View style={styles.root}>
      <SidebarBackdrop />

      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{t('navigation.appName')}</Text>
            <Text style={styles.headerSubtitle}>
              {t('navigation.appSubtitle')}
            </Text>
          </View>

          {sidebarSections.map((section) => (
            <View key={section.title} style={styles.section}>
              <Text style={styles.sectionLabel}>{section.title}</Text>

              {section.items.map((item) => (
                <SidebarSourceRow
                  key={item.route}
                  item={item}
                  selected={isRouteSelected(pathname, item.route)}
                  onPress={() => {
                    router.push(item.route);
                    navigation.closeDrawer();
                  }}
                />
              ))}
            </View>
          ))}

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>{t('auth.account')}</Text>
            <View style={styles.languageRow}>
              <Text style={styles.languageLabel}>{t('common.language')}</Text>
              <LanguageSwitcher />
            </View>
            {user ? (
              <Text style={styles.userEmail}>{user.email}</Text>
            ) : null}
            <AppPressable onPress={handleSignOut} style={styles.signOutButton}>
              <Text style={styles.signOutText}>{t('auth.signOut')}</Text>
            </AppPressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(60, 60, 67, 0.18)',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.sidebarText,
  },
  headerSubtitle: {
    fontSize: 13,
    color: colors.sidebarTextSecondary,
    marginTop: 4,
  },
  section: {
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.sidebarTextSecondary,
    paddingHorizontal: 16,
    paddingBottom: 6,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  languageLabel: {
    fontSize: 13,
    color: colors.sidebarTextSecondary,
  },
  userEmail: {
    fontSize: 13,
    color: colors.sidebarTextSecondary,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  signOutButton: {
    marginHorizontal: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
  },
  signOutText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
});
