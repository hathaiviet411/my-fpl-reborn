import * as React from "react";
import Svg, { G, Circle, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import type { SvgProps } from "react-native-svg";
const SvgEllipse1 = (props: SvgProps) => (
  <Svg
    width={1318.57}
    height={1318.57}
    fill="none"


    {...props}
  >
    <G opacity={0.8}>
      <Circle cx={659.286} cy={659.286} r={291} fill="#EBC894" />
    </G>
    <Defs></Defs>
  </Svg>
);
export default SvgEllipse1;
