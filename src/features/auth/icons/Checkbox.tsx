import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgCheckbox = (props: SvgProps) => (
  <Svg
    width={12.583}
    height={12.583}
    fill="none"


    {...props}
  >
    <Path
      stroke="#6C7278"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M.75 2.333A1.583 1.583 0 0 1 2.333.75h7.917a1.583 1.583 0 0 1 1.583 1.583v7.917a1.583 1.583 0 0 1-1.583 1.583H2.333A1.583 1.583 0 0 1 .75 10.25z"
    />
  </Svg>
);
export default SvgCheckbox;
