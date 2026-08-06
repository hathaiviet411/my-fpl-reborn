import { isNetworkLoggerEnabled } from '@/src/config/networkLogger';

export function setupNetworkLogger(): void {
  if (!isNetworkLoggerEnabled()) {
    return;
  }

  const { startNetworkLogging } =
    require('react-native-network-logger') as typeof import('react-native-network-logger');

  startNetworkLogging({ maxRequests: 500 });
}
