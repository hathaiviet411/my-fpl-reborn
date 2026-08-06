import { AUTH_ERROR_CODES } from '@/src/features/auth/authErrors';
import { MockAuthProvider } from '@/src/features/auth/providers/MockAuthProvider';

describe('MockAuthProvider', () => {
  const provider = new MockAuthProvider();

  it('returns a session for valid credentials', async () => {
    const session = await provider.login('test@example.com', 'password123');

    expect(session.token).toMatch(/^mock-token-/);
    expect(session.user.email).toBe('test@example.com');
  });

  it('throws when email is invalid', async () => {
    await expect(provider.login('invalid-email', 'password123')).rejects.toMatchObject(
      { code: AUTH_ERROR_CODES.INVALID_EMAIL },
    );
  });

  it('throws when fields are empty', async () => {
    await expect(provider.login('', '')).rejects.toMatchObject({
      code: AUTH_ERROR_CODES.EMAIL_PASSWORD_REQUIRED,
    });
  });
});
