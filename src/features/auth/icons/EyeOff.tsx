import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgEyeOff = (props: SvgProps) => (
  <Svg
    width={13.3}
    height={13.3}
    fill="none"


    {...props}
  >
    <Path
      stroke="#ACB5BB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.3}
      d="M5.707 5.708a1.333 1.333 0 0 0 1.886 1.885M9.77 9.765a5.8 5.8 0 0 1-3.121.885q-3.6 0-6-4 1.272-2.12 2.88-3.116m1.907-.764q.6-.12 1.213-.12 3.6 0 6 4-.667 1.11-1.425 1.913M.65.65l12 12"
    />
  </Svg>
);
export default SvgEyeOff;
