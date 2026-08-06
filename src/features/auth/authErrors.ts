export const AUTH_ERROR_CODES = {
  EMAIL_PASSWORD_REQUIRED: 'AUTH_EMAIL_PASSWORD_REQUIRED',
  INVALID_EMAIL: 'AUTH_INVALID_EMAIL',
} as const;

export type AuthErrorCode =
  (typeof AUTH_ERROR_CODES)[keyof typeof AUTH_ERROR_CODES];

export class AuthError extends Error {
  constructor(public readonly code: AuthErrorCode) {
    super(code);
    this.name = 'AuthError';
  }
}

export function isAuthError(error: unknown): error is AuthError {
  return error instanceof AuthError;
}
