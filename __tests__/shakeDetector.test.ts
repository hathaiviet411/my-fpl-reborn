import {
  createShakeDetector,
  getAccelerationMagnitude,
  SHAKE_DETECTOR_CONFIG,
} from '@/src/hooks/shakeDetector';

describe('shakeDetector', () => {
  it('requires multiple peaks above threshold within the peak window', () => {
    const onShake = jest.fn();
    const detectShake = createShakeDetector(onShake, {
      ...SHAKE_DETECTOR_CONFIG,
      cooldownMs: 0,
    });

    const weakShake = { x: 0.2, y: 0.2, z: 1.1 };
    const strongShake = { x: 1.8, y: 1.8, z: 1.8 };

    expect(getAccelerationMagnitude(weakShake)).toBeLessThan(
      SHAKE_DETECTOR_CONFIG.thresholdG,
    );
    expect(getAccelerationMagnitude(strongShake)).toBeGreaterThan(
      SHAKE_DETECTOR_CONFIG.thresholdG,
    );

    detectShake(strongShake, 1_000);
    expect(onShake).not.toHaveBeenCalled();

    detectShake(strongShake, 1_200);
    expect(onShake).toHaveBeenCalledTimes(1);
  });

  it('ignores peaks that are too far apart', () => {
    const onShake = jest.fn();
    const detectShake = createShakeDetector(onShake, {
      ...SHAKE_DETECTOR_CONFIG,
      cooldownMs: 0,
    });
    const strongShake = { x: 1.8, y: 1.8, z: 1.8 };

    detectShake(strongShake, 1_000);
    detectShake(strongShake, 2_000);

    expect(onShake).not.toHaveBeenCalled();
  });
});
