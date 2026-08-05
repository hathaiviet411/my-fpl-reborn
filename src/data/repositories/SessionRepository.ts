import {
  storageGetItem,
  storageRemoveItem,
  storageSetItem,
} from '@/src/core/storage';
import type { User } from '@/src/features/auth/types';

const TOKEN_KEY = 'auth.access_token';
const USER_KEY = 'auth.user';

export class SessionRepository {
  async getToken(): Promise<string | null> {
    return storageGetItem(TOKEN_KEY);
  }

  async getUser(): Promise<User | null> {
    const raw = await storageGetItem(USER_KEY);
    if (!raw) return null;

    return JSON.parse(raw) as User;
  }

  async saveSession(token: string, user: User): Promise<void> {
    await Promise.all([
      storageSetItem(TOKEN_KEY, token),
      storageSetItem(USER_KEY, JSON.stringify(user)),
    ]);
  }

  async clearSession(): Promise<void> {
    await Promise.all([
      storageRemoveItem(TOKEN_KEY),
      storageRemoveItem(USER_KEY),
    ]);
  }
}

export const sessionRepository = new SessionRepository();
