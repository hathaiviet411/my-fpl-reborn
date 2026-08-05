import type { AuthSession } from '@/src/features/auth/types';

export type AuthProvider = {
  login(email: string, password: string): Promise<AuthSession>;
};
