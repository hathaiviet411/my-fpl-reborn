import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';

import { AppPressable } from '@/src/components/ui/AppPressable';
import type { AppLocale } from '@/src/core/i18n/resolveLocale';
import { authImages } from '@/src/features/auth/assets';
import { colors } from '@/src/theme/colors';
import { useLocaleStore } from '@/src/stores/localeStore';

const LANGUAGE_OPTIONS: {
  locale: AppLocale;
  flag: (typeof authImages)[keyof typeof authImages];
  labelKey: 'common.languageNames.vi' | 'common.languageNames.en';
}[] = [
  {
    locale: 'vi',
    flag: authImages.flagVietnam,
    labelKey: 'common.languageNames.vi',
  },
  {
    locale: 'en',
    flag: authImages.flagUnitedKingdom,
    labelKey: 'common.languageNames.en',
  },
];

export function SidebarLanguagePicker() {
  const { t } = useTranslation();
  const locale = useLocaleStore((state) => state.locale);
  const setLocale = useLocaleStore((state) => state.setLocale);

  return (
    <View style={styles.list}>
      {LANGUAGE_OPTIONS.map((option) => {
        const selected = locale === option.locale;

        return (
          <AppPressable
            key={option.locale}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => {
              void setLocale(option.locale);
            }}
            style={[styles.row, selected && styles.rowSelected]}
          >
            <Image
              resizeMode="cover"
              source={option.flag}
              style={styles.flag}
            />
            <Text style={[styles.label, selected && styles.labelSelected]}>
              {t(option.labelKey)}
            </Text>
          </AppPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 40,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  rowSelected: {
    backgroundColor: colors.sidebarSelection,
  },
  flag: {
    width: 28,
    height: 20,
    borderRadius: 3,
  },
  label: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: colors.sidebarText,
  },
  labelSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
});
