import {
  AUTH_ERROR_CODES,
  AuthError,
} from '@/src/features/auth/authErrors';
import type { AuthProvider } from '@/src/features/auth/providers/AuthProvider';
import type { AuthSession } from '@/src/features/auth/types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class MockAuthProvider implements AuthProvider {
  async login(email: string, password: string): Promise<AuthSession> {
    await delay(600);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      throw new AuthError(AUTH_ERROR_CODES.EMAIL_PASSWORD_REQUIRED);
    }

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      throw new AuthError(AUTH_ERROR_CODES.INVALID_EMAIL);
    }

    return {
      token: `mock-token-${Date.now()}`,
      user: {
        id: 'mock-user-1',
        email: trimmedEmail,
        name: trimmedEmail.split('@')[0] ?? 'User',
      },
    };
  }
}
