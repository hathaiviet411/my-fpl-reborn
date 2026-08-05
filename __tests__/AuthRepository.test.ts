import { AuthRepository } from '@/src/data/repositories/AuthRepository';
import { SessionRepository } from '@/src/data/repositories/SessionRepository';
import type { AuthProvider } from '@/src/features/auth/providers/AuthProvider';
import type { AuthSession } from '@/src/features/auth/types';

const mockSession: AuthSession = {
  token: 'token-1',
  user: { id: '1', email: 'a@b.com', name: 'a' },
};

function createMockProvider(session: AuthSession = mockSession): AuthProvider {
  return {
    login: jest.fn().mockResolvedValue(session),
  };
}

function createMockSessionRepository(): SessionRepository {
  return {
    getToken: jest.fn().mockResolvedValue(null),
    getUser: jest.fn().mockResolvedValue(null),
    saveSession: jest.fn().mockResolvedValue(undefined),
    clearSession: jest.fn().mockResolvedValue(undefined),
  } as unknown as SessionRepository;
}

describe('AuthRepository', () => {
  it('login delegates to auth provider', async () => {
    const provider = createMockProvider();
    const sessionRepo = createMockSessionRepository();
    const repository = new AuthRepository(provider, sessionRepo);

    const session = await repository.login('a@b.com', 'password');

    expect(provider.login).toHaveBeenCalledWith('a@b.com', 'password');
    expect(session).toEqual(mockSession);
  });

  it('restoreSession returns null when token or user is missing', async () => {
    const sessionRepo = createMockSessionRepository();
    const repository = new AuthRepository(createMockProvider(), sessionRepo);

    await expect(repository.restoreSession()).resolves.toBeNull();
  });

  it('restoreSession returns session when token and user exist', async () => {
    const sessionRepo = createMockSessionRepository();
    (sessionRepo.getToken as jest.Mock).mockResolvedValue('token-1');
    (sessionRepo.getUser as jest.Mock).mockResolvedValue(mockSession.user);

    const repository = new AuthRepository(createMockProvider(), sessionRepo);

    await expect(repository.restoreSession()).resolves.toEqual(mockSession);
  });

  it('logout clears session storage', async () => {
    const sessionRepo = createMockSessionRepository();
    const repository = new AuthRepository(createMockProvider(), sessionRepo);

    await repository.logout();

    expect(sessionRepo.clearSession).toHaveBeenCalled();
  });
});
