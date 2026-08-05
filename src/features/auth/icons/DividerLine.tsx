import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgDividerLine = (props: SvgProps) => (
  <Svg
    width={96}
    height={1}
    fill="none"


    {...props}
  >
    <Path stroke="#fff" strokeLinecap="round" d="M.5.5h95" />
  </Svg>
);
export default SvgDividerLine;
