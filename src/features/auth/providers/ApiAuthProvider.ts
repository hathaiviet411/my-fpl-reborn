import { apiClient } from '@/src/core/http/apiClient';
import type { AuthProvider } from '@/src/features/auth/providers/AuthProvider';
import type { AuthSession } from '@/src/features/auth/types';

export class ApiAuthProvider implements AuthProvider {
  async login(email: string, password: string): Promise<AuthSession> {
    const response = await apiClient.post<AuthSession>('/auth/login', {
      email,
      password,
    });

    return response.data;
  }
}
