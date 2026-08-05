import {
  SessionRepository,
  sessionRepository,
} from '@/src/data/repositories/SessionRepository';
import { createAuthProvider } from '@/src/features/auth/providers/createAuthProvider';
import type { AuthProvider } from '@/src/features/auth/providers/AuthProvider';
import type { AuthSession, User } from '@/src/features/auth/types';

export class AuthRepository {
  constructor(
    private readonly provider: AuthProvider,
    private readonly session: SessionRepository,
  ) {}

  async login(email: string, password: string): Promise<AuthSession> {
    return this.provider.login(email, password);
  }

  async saveSession(token: string, user: User): Promise<void> {
    await this.session.saveSession(token, user);
  }

  async logout(): Promise<void> {
    await this.session.clearSession();
  }

  async restoreSession(): Promise<AuthSession | null> {
    const [token, user] = await Promise.all([
      this.session.getToken(),
      this.session.getUser(),
    ]);

    if (!token || !user) {
      return null;
    }

    return { token, user };
  }
}

export const authRepository = new AuthRepository(
  createAuthProvider(),
  sessionRepository,
);
