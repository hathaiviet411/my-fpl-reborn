import { UIManager } from 'react-native';

let cached: boolean | null = null;

export function hasNativeSvg(): boolean {
  if (cached != null) return cached;
  cached = UIManager.getViewManagerConfig?.('RNSVGSvgView') != null;
  return cached;
}
