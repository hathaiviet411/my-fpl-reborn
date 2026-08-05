import * as React from "react";
import Svg, { G, Circle, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import type { SvgProps } from "react-native-svg";
const SvgEllipse3 = (props: SvgProps) => (
  <Svg
    width={580.5}
    height={580.5}
    fill="none"


    {...props}
  >
    <G>
      <Circle cx={290.25} cy={290.25} r={160.25} fill="#fff" />
    </G>
    <Defs></Defs>
  </Svg>
);
export default SvgEllipse3;
