import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgGoogle = (props: SvgProps) => (
  <Svg
    width={7.714}
    height={7.402}
    fill="none"


    {...props}
  >
    <Path
      fill="#4285F4"
      d="M7.714 1.61c0-.648-.053-1.12-.17-1.61H0v2.922h4.429c-.09.727-.572 1.82-1.643 2.555l-.015.098 2.385 1.811.165.016C6.84 6.03 7.714 4.008 7.714 1.61"
    />
  </Svg>
);
export default SvgGoogle;
