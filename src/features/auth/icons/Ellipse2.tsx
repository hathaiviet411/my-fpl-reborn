import * as React from "react";
import Svg, { G, Circle, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import type { SvgProps } from "react-native-svg";
const SvgEllipse2 = (props: SvgProps) => (
  <Svg
    width={2116.06}
    height={2116.06}
    fill="none"


    {...props}
  >
    <G opacity={0.8}>
      <Circle cx={1058.03} cy={1058.03} r={467} fill="#B49EF4" />
    </G>
    <Defs></Defs>
  </Svg>
);
export default SvgEllipse2;
