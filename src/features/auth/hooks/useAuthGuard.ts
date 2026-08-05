import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

import { useAuthStore } from '@/src/stores/authStore';

type AuthGuardMode = 'root' | 'requireAuth' | 'requireGuest';

type UseAuthGuardOptions = {
  mode: AuthGuardMode;
};

export function useAuthGuard({ mode }: UseAuthGuardOptions) {
  const router = useRouter();
  const segments = useSegments();
  const hydrate = useAuthStore((state) => state.hydrate);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!isHydrated) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (mode === 'root') {
      if (!isAuthenticated && !inAuthGroup) {
        router.replace('/login');
        return;
      }

      if (isAuthenticated && inAuthGroup) {
        router.replace('/');
      }

      return;
    }

    if (mode === 'requireGuest' && isAuthenticated) {
      router.replace('/');
      return;
    }

    if (mode === 'requireAuth' && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isHydrated, mode, router, segments]);

  return { isHydrated, isAuthenticated };
}
