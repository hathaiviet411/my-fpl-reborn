import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { AppPressable } from '@/src/components/ui/AppPressable';

import type { AppLocale } from '@/src/core/i18n/resolveLocale';
import { authImages } from '@/src/features/auth/assets';
import { colors } from '@/src/theme/colors';
import { useLocaleStore } from '@/src/stores/localeStore';

const LOCALE_FLAGS: Record<
  AppLocale,
  { source: (typeof authImages)[keyof typeof authImages]; switchLabel: string }
> = {
  vi: { source: authImages.flagVietnam, switchLabel: 'Switch to Vietnamese' },
  en: {
    source: authImages.flagUnitedKingdom,
    switchLabel: 'Switch to English',
  },
};

const FLAG_WIDTH = 28;
const FLAG_HEIGHT = 20;
const SLIDE_OFFSET = 14;
const TRACK_WIDTH = 96;
const TRACK_HEIGHT = 36;

const VI_RED = '#DA251D';
const EN_BLUE = colors.link;

const SPRING_CONFIG = {
  damping: 22,
  stiffness: 280,
  overshootClamping: true,
} as const;

function getTargetLocale(current: AppLocale): AppLocale {
  return current === 'en' ? 'vi' : 'en';
}

function localeToProgress(locale: AppLocale) {
  return locale === 'vi' ? 0 : 1;
}

export function LanguageSwitcher() {
  const locale = useLocaleStore((state) => state.locale);
  const setLocale = useLocaleStore((state) => state.setLocale);

  const targetLocale = getTargetLocale(locale);
  const switchLabel = LOCALE_FLAGS[targetLocale].switchLabel;
  const progress = useSharedValue(localeToProgress(locale));

  useEffect(() => {
    progress.value = withSpring(localeToProgress(locale), SPRING_CONFIG);
  }, [locale, progress]);

  const vietnameseLayoutStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.45, 1], [1, 0, 0]);

    return {
      opacity,
      zIndex: progress.value < 0.5 ? 2 : 0,
      display: opacity < 0.01 ? 'none' : 'flex',
      transform: [
        {
          translateX: interpolate(progress.value, [0, 1], [0, -SLIDE_OFFSET]),
        },
      ],
    };
  });

  const englishLayoutStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.55, 1], [0, 0, 1]);

    return {
      opacity,
      zIndex: progress.value >= 0.5 ? 2 : 0,
      display: opacity < 0.01 ? 'none' : 'flex',
      transform: [
        {
          translateX: interpolate(progress.value, [0, 1], [SLIDE_OFFSET, 0]),
        },
      ],
    };
  });

  const handlePress = () => {
    void setLocale(targetLocale);
  };

  return (
    <AppPressable
      accessibilityLabel={switchLabel}
      accessibilityRole="button"
      hitSlop={8}
      onPress={handlePress}
      style={styles.pressable}
    >
      <View style={styles.track}>
        <Animated.View
          pointerEvents="none"
          style={[styles.layout, vietnameseLayoutStyle]}
        >
          <Image
            resizeMode="cover"
            source={LOCALE_FLAGS.vi.source}
            style={styles.flag}
          />
          <Text style={styles.divider}>|</Text>
          <Text style={styles.viLabel}>VI</Text>
        </Animated.View>

        <Animated.View
          pointerEvents="none"
          style={[styles.layout, englishLayoutStyle]}
        >
          <Text style={styles.enLabel}>EN</Text>
          <Text style={styles.divider}>|</Text>
          <Image
            resizeMode="cover"
            source={LOCALE_FLAGS.en.source}
            style={styles.flag}
          />
        </Animated.View>
      </View>
    </AppPressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 10,
  },
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.stroke,
    overflow: 'hidden',
  },
  layout: {
    ...StyleSheet.absoluteFill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  flag: {
    width: FLAG_WIDTH,
    height: FLAG_HEIGHT,
    borderRadius: 3,
  },
  divider: {
    fontSize: 12,
    lineHeight: 14,
    color: '#C5CAD0',
    fontWeight: '300',
  },
  viLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: VI_RED,
    letterSpacing: 0.4,
  },
  enLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: EN_BLUE,
    letterSpacing: 0.4,
  },
});
