import { useState } from 'react';
import { Alert } from 'react-native';

import { useLogin } from '@/src/features/auth/hooks/useLogin';

const DEFAULT_EMAIL = 'Loisbecket@gmail.com';
const DEFAULT_PASSWORD = 'password';

export function useLoginScreen() {
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [rememberMe, setRememberMe] = useState(false);
  const loginMutation = useLogin();

  const handleLogin = () => {
    loginMutation.mutate(
      { email, password },
      {
        onError: (error) => {
          Alert.alert(
            'Login failed',
            error instanceof Error ? error.message : 'Unable to log in.',
          );
        },
      },
    );
  };

  const toggleRememberMe = () => {
    setRememberMe((value) => !value);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    toggleRememberMe,
    handleLogin,
    isPending: loginMutation.isPending,
  };
}
