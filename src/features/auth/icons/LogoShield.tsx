import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

export default function LogoShield(props: SvgProps) {
  return (
    <Svg fill="none" viewBox="0 0 34 34" {...props}>
      <Path
        d="M17 2.833 6.375 7.792v6.375c0 5.667 4.25 10.625 10.625 12.125 6.375-1.5 10.625-6.458 10.625-12.125V7.792L17 2.833Z"
        fill="#4D81E7"
      />
      <Path
        d="M17 9.917a3.542 3.542 0 1 0 0 7.083 3.542 3.542 0 0 0 0-7.083Zm0 9.916c-2.833 0-5.313 1.417-6.792 3.542 1.77 1.416 3.958 2.25 6.792 2.25s5.021-.834 6.792-2.25c-1.479-2.125-3.959-3.542-6.792-3.542Z"
        fill="#FFFFFF"
      />
    </Svg>
  );
}
