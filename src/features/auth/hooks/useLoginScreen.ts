import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

import {
  AUTH_ERROR_CODES,
  isAuthError,
} from '@/src/features/auth/authErrors';
import type { CampusOption } from '@/src/features/auth/constants/campusOptions';
import { useLogin } from '@/src/features/auth/hooks/useLogin';

const DEFAULT_EMAIL = 'ctv.vietht@fpt.edu.vn';
const DEFAULT_PASSWORD = 'password';

function getLoginErrorMessage(
  error: unknown,
  t: (key: string) => string,
): string {
  if (isAuthError(error)) {
    if (error.code === AUTH_ERROR_CODES.EMAIL_PASSWORD_REQUIRED) {
      return t('auth.errors.emailPasswordRequired');
    }

    if (error.code === AUTH_ERROR_CODES.INVALID_EMAIL) {
      return t('auth.errors.invalidEmail');
    }
  }

  return t('auth.loginFailedGeneric');
}

export function useLoginScreen() {
  const { t } = useTranslation();
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState<CampusOption | null>(
    null,
  );
  const loginMutation = useLogin();

  const handleLogin = () => {
    loginMutation.mutate(
      { email, password },
      {
        onError: (error) => {
          Alert.alert(
            t('auth.loginFailed'),
            getLoginErrorMessage(error, t),
          );
        },
      },
    );
  };

  const handleFaceIdLogin = () => {
    Alert.alert(
      t('common.comingSoonTitle'),
      t('auth.faceIdComingSoon'),
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
    selectedCampus,
    setSelectedCampus,
    handleLogin,
    handleFaceIdLogin,
    isPending: loginMutation.isPending,
    t,
  };
}
