import { useCallback, useEffect, useState } from 'react';

import { isNetworkLoggerEnabled } from '@/src/config/networkLogger';
import {
  createShakeDetector,
  SHAKE_DETECTOR_CONFIG,
  type AccelerometerMeasurement,
} from '@/src/hooks/shakeDetector';

type AccelerometerModule = {
  default: {
    isAvailableAsync: () => Promise<boolean>;
    setUpdateInterval: (intervalMs: number) => void;
    addListener: (
      listener: (measurement: AccelerometerMeasurement) => void,
    ) => { remove: () => void };
  };
};

export type UseShakeNetworkLoggerResult = {
  isVisible: boolean;
  open: () => void;
  close: () => void;
};

async function loadAccelerometer(): Promise<AccelerometerModule['default'] | null> {
  try {
    const module = require('expo-sensors/build/Accelerometer') as AccelerometerModule;

    return module.default;
  } catch (error) {
    if (__DEV__) {
      console.warn(
        '[network-logger] Accelerometer unavailable. Rebuild the native app after adding expo-sensors.',
        error,
      );
    }

    return null;
  }
}

export function useShakeNetworkLogger(): UseShakeNetworkLoggerResult {
  const [isVisible, setIsVisible] = useState(false);

  const open = useCallback(() => {
    setIsVisible(true);
  }, []);

  const close = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (!isNetworkLoggerEnabled()) {
      return;
    }

    let subscription: { remove: () => void } | undefined;
    let isMounted = true;

    const startListening = async () => {
      const Accelerometer = await loadAccelerometer();

      if (!isMounted || !Accelerometer) {
        return;
      }

      const isAvailable = await Accelerometer.isAvailableAsync();

      if (!isMounted || !isAvailable) {
        return;
      }

      Accelerometer.setUpdateInterval(SHAKE_DETECTOR_CONFIG.updateIntervalMs);

      const detectShake = createShakeDetector(() => {
        setIsVisible(true);
      });

      subscription = Accelerometer.addListener((measurement) => {
        detectShake(measurement);
      });
    };

    void startListening();

    return () => {
      isMounted = false;
      subscription?.remove();
    };
  }, []);

  return { isVisible, open, close };
}
