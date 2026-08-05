import { Redirect, Stack } from 'expo-router';

import { useAuthGuard } from '@/src/features/auth/hooks/useAuthGuard';

export default function AuthLayout() {
  const { isAuthenticated, isHydrated } = useAuthGuard({ mode: 'requireGuest' });

  if (isHydrated && isAuthenticated) {
    return <Redirect href="/" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
