import { usePathname, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SidebarLanguagePicker } from '@/src/components/i18n/SidebarLanguagePicker';
import { authImages } from '@/src/features/auth/assets';
import { colors } from '@/src/theme/colors';
import { sidebarSloganFontFamily } from '@/src/theme/fonts';

import { SidebarBackdrop } from './SidebarBackdrop';
import { SidebarSourceRow } from './SidebarSourceRow';
import { getSidebarSections } from './sidebarItems';

const SIDEBAR_CONTACT_EMAIL = 'ctv.vietht@fpt.edu.vn';

type DrawerContentProps = {
  navigation: {
    closeDrawer: () => void;
  };
};

function isRouteSelected(pathname: string, route: string) {
  if (route === '/') {
    return (
      pathname === '/' ||
      pathname === '/index' ||
      pathname.endsWith('/index')
    );
  }

  return pathname === route || pathname.startsWith(`${route}/`);
}

export function DrawerContent({ navigation }: DrawerContentProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const sidebarSections = getSidebarSections(t);

  return (
    <View style={styles.root}>
      <SidebarBackdrop />

      <SafeAreaView edges={['top', 'left', 'right', 'bottom']} style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          style={styles.scroll}
        >
          <View style={styles.header}>
            <Image
              accessibilityLabel="FPT Polytechnic"
              resizeMode="contain"
              source={authImages.loginLogo}
              style={styles.logo}
            />
          </View>

          <View style={styles.languageSection}>
            <Text style={styles.languageTitle}>{t('common.language')}</Text>
            <SidebarLanguagePicker />
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
        </ScrollView>

        <Text style={styles.footerSlogan}>
          {`"${t('navigation.appSlogan')}"`}
        </Text>

        <View style={styles.footer}>
          {/* <Text style={styles.footerEmail}>
            {user?.email ?? SIDEBAR_CONTACT_EMAIL}
          </Text> */}
          <Text style={styles.footerCopyright}>
            {t('navigation.sidebarCopyright')}
          </Text>
        </View>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(60, 60, 67, 0.18)',
    marginBottom: 12,
  },
  logo: {
    width: 200,
    height: 66,
  },
  languageSection: {
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  languageTitle: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.sidebarTextSecondary,
    marginBottom: 8,
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
    paddingHorizontal: 10,
    paddingBottom: 6,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(60, 60, 67, 0.18)',
  },
  footerEmail: {
    fontSize: 12,
    color: colors.sidebarTextSecondary,
    marginBottom: 12,
  },
  footerSlogan: {
    fontFamily: sidebarSloganFontFamily,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 0.2,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  footerCopyright: {
    fontSize: 10,
    color: colors.sidebarTextSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
});
