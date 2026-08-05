import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgPhone = (props: SvgProps) => (
  <Svg
    width={10.5}
    height={15}
    fill="none"


    {...props}
  >
    <Path
      stroke="#04070E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.5 1.5H6m-.75 9.75v.008M.75 2.25a1.5 1.5 0 0 1 1.5-1.5h6a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5z"
    />
  </Svg>
);
export default SvgPhone;
