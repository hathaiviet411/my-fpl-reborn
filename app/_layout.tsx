import '@/src/core/i18n';
import '@/src/core/text/setupGlobalText';

import { useFonts } from '@expo-google-fonts/lavishly-yours/useFonts';
import { GradientView } from '@/src/components/ui/GradientView';
import { NetworkLoggerProvider } from '@/src/components/dev/NetworkLoggerProvider';
import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/src/core/http/queryClient';
import { setupNetworkLogger } from '@/src/core/http/setupNetworkLogger';
import { NotificationBootstrap } from '@/src/components/notifications/NotificationBootstrap';
import { useAuthGuard } from '@/src/features/auth/hooks/useAuthGuard';
import { useLocaleStore } from '@/src/stores/localeStore';
import { colors } from '@/src/theme/colors';
import { sidebarSloganFonts } from '@/src/theme/fonts';

if (__DEV__) {
  require('@/src/config/reactotron');
}

setupNetworkLogger();

function RootNavigator() {
  const { isHydrated: isAuthHydrated } = useAuthGuard({ mode: 'root' });
  const isLocaleHydrated = useLocaleStore((state) => state.isHydrated);
  const hydrateLocale = useLocaleStore((state) => state.hydrate);
  const [fontsLoaded] = useFonts(sidebarSloganFonts);

  useEffect(() => {
    void hydrateLocale();
  }, [hydrateLocale]);

  if (!isAuthHydrated || !isLocaleHydrated || !fontsLoaded) {
    return (
      <View style={styles.splash}>
        <GradientView
          colors={[colors.backgroundTop, colors.backgroundBottom]}
          style={StyleSheet.absoluteFill}
        />
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <>
      <NotificationBootstrap />
      <Slot />
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NetworkLoggerProvider>
          <QueryClientProvider client={queryClient}>
            <RootNavigator />
          </QueryClientProvider>
        </NetworkLoggerProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundTop,
  },
});
