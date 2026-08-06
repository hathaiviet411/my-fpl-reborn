export type AccelerometerMeasurement = {
  x: number;
  y: number;
  z: number;
};

export const SHAKE_DETECTOR_CONFIG = {
  /** Total acceleration magnitude required for one shake peak (rest ~= 1g). */
  thresholdG: 2.5,
  /** Number of peaks required within the peak window. */
  requiredPeaks: 2,
  /** Peaks must occur within this window to count as a deliberate shake. */
  peakWindowMs: 550,
  /** Minimum time before another shake can open the logger. */
  cooldownMs: 2200,
  updateIntervalMs: 120,
} as const;

export type ShakeDetectorConfig = {
  thresholdG: number;
  requiredPeaks: number;
  peakWindowMs: number;
  cooldownMs: number;
  updateIntervalMs: number;
};

export function getAccelerationMagnitude({
  x,
  y,
  z,
}: AccelerometerMeasurement): number {
  return Math.sqrt(x * x + y * y + z * z);
}

export function createShakeDetector(
  onShake: () => void,
  config: ShakeDetectorConfig = SHAKE_DETECTOR_CONFIG,
) {
  let lastShakeAt = 0;
  let peakTimestamps: number[] = [];

  return (measurement: AccelerometerMeasurement, now = Date.now()) => {
    if (getAccelerationMagnitude(measurement) < config.thresholdG) {
      return;
    }

    if (now - lastShakeAt < config.cooldownMs) {
      return;
    }

    peakTimestamps = peakTimestamps.filter(
      (timestamp) => now - timestamp <= config.peakWindowMs,
    );
    peakTimestamps.push(now);

    if (peakTimestamps.length < config.requiredPeaks) {
      return;
    }

    lastShakeAt = now;
    peakTimestamps = [];
    onShake();
  };
}
