import type { ComponentType, ReactNode } from 'react';
import type { SvgProps } from 'react-native-svg';

import { hasNativeSvg } from '@/src/utils/hasNativeSvg';

type AuthSvgIconProps = SvgProps & {
  Icon: ComponentType<SvgProps>;
  fallback: ReactNode;
};

export function AuthSvgIcon({ Icon, fallback, ...props }: AuthSvgIconProps) {
  if (!hasNativeSvg()) {
    return fallback;
  }

  return <Icon {...props} />;
}
