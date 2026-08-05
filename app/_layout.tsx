import { GradientView } from '@/src/components/ui/GradientView';
import { Slot } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/src/core/http/queryClient';
import { useAuthGuard } from '@/src/features/auth/hooks/useAuthGuard';
import { colors } from '@/src/theme/colors';

if (__DEV__) {
  require('@/src/config/reactotron');
}

function RootNavigator() {
  const { isHydrated } = useAuthGuard({ mode: 'root' });

  if (!isHydrated) {
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

  return <Slot />;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <RootNavigator />
        </QueryClientProvider>
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
