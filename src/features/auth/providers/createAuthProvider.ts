import { ApiAuthProvider } from '@/src/features/auth/providers/ApiAuthProvider';
import type { AuthProvider } from '@/src/features/auth/providers/AuthProvider';
import { MockAuthProvider } from '@/src/features/auth/providers/MockAuthProvider';

export function createAuthProvider(): AuthProvider {
  if (process.env.EXPO_PUBLIC_AUTH_MODE === 'api') {
    return new ApiAuthProvider();
  }

  return new MockAuthProvider();
}
