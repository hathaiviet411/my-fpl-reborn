import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { authRepository } from '@/src/data/repositories/AuthRepository';
import { useAuthStore } from '@/src/stores/authStore';

type LoginInput = {
  email: string;
  password: string;
};

export function useLogin() {
  const router = useRouter();
  const signIn = useAuthStore((state) => state.signIn);

  return useMutation({
    mutationFn: ({ email, password }: LoginInput) =>
      authRepository.login(email, password),
    onSuccess: async (session) => {
      await signIn(session.token, session.user);
      router.replace('/');
    },
  });
}
