import { create } from 'zustand';

import { authRepository } from '@/src/data/repositories/AuthRepository';
import type { User } from '@/src/features/auth/types';

type AuthState = {
  user: User | null;
  isHydrated: boolean;
  isAuthenticated: boolean;
  hydrate: () => Promise<void>;
  signIn: (token: string, user: User) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isHydrated: false,
  isAuthenticated: false,

  hydrate: async () => {
    const session = await authRepository.restoreSession();
    set({
      user: session?.user ?? null,
      isAuthenticated: Boolean(session),
      isHydrated: true,
    });
  },

  signIn: async (token, user) => {
    await authRepository.saveSession(token, user);
    set({ user, isAuthenticated: true });
  },

  signOut: async () => {
    await authRepository.logout();
    set({ user: null, isAuthenticated: false });
  },
}));
