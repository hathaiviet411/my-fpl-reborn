import Apple from '@/src/features/auth/icons/Apple';
import Checkbox from '@/src/features/auth/icons/Checkbox';
import DividerLine from '@/src/features/auth/icons/DividerLine';
import Ellipse1 from '@/src/features/auth/icons/Ellipse1';
import Ellipse2 from '@/src/features/auth/icons/Ellipse2';
import Ellipse3 from '@/src/features/auth/icons/Ellipse3';
import EyeOff from '@/src/features/auth/icons/EyeOff';
import Facebook from '@/src/features/auth/icons/Facebook';
import Google from '@/src/features/auth/icons/Google';
import LogoShield from '@/src/features/auth/icons/LogoShield';
import Phone from '@/src/features/auth/icons/Phone';

export const authIcons = {
  logoShield: LogoShield,
  eyeOff: EyeOff,
  checkbox: Checkbox,
  ellipse1: Ellipse1,
  ellipse2: Ellipse2,
  ellipse3: Ellipse3,
  dividerLine: DividerLine,
  google: Google,
  facebook: Facebook,
  apple: Apple,
  phone: Phone,
} as const;

export const authImages = {
  loginLogo: require('../../../assets/auth/images/logo.png'),
  flagVietnam: require('../../../assets/auth/icons/vietnam.png'),
  flagUnitedKingdom: require('../../../assets/auth/icons/united-kingdom.png'),
  faceId: require('../../../assets/auth/icons/face-id.png'),
} as const;
