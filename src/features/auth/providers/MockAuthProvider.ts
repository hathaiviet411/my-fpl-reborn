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
      throw new Error('Email and password are required.');
    }

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      throw new Error('Please enter a valid email address.');
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
