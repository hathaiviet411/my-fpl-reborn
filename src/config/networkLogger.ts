/**
 * Network logger is enabled in development or when explicitly opted in
 * via EXPO_PUBLIC_ENABLE_NETWORK_LOGGER=true (e.g. Staging / QA builds).
 *
 * Production builds must leave the flag unset or set to "false".
 */
export function isNetworkLoggerEnabled(): boolean {
  if (__DEV__) {
    return true;
  }

  return process.env.EXPO_PUBLIC_ENABLE_NETWORK_LOGGER === 'true';
}
