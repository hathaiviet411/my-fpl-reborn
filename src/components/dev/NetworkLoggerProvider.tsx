import type { ReactNode } from 'react';

import { NetworkLoggerModal } from '@/src/components/dev/NetworkLoggerModal';
import { isNetworkLoggerEnabled } from '@/src/config/networkLogger';
import { useShakeNetworkLogger } from '@/src/hooks/useShakeNetworkLogger';

type NetworkLoggerProviderProps = {
  children: ReactNode;
};

function NetworkLoggerActive({ children }: NetworkLoggerProviderProps) {
  const { isVisible, close } = useShakeNetworkLogger();

  return (
    <>
      {children}
      <NetworkLoggerModal onClose={close} visible={isVisible} />
    </>
  );
}

export function NetworkLoggerProvider({ children }: NetworkLoggerProviderProps) {
  if (!isNetworkLoggerEnabled()) {
    return children;
  }

  return <NetworkLoggerActive>{children}</NetworkLoggerActive>;
}
