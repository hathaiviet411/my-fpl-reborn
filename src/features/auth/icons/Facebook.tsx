import * as React from "react";
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgFacebook = (props: SvgProps) => (
  <Svg
    width={18}
    height={18}
    fill="none"


    {...props}
  >
    <G clipPath="url(#facebook_svg__a)">
      <Path
        fill="url(#facebook_svg__b)"
        d="M7.515 17.91C3.24 17.145 0 13.455 0 9c0-4.95 4.05-9 9-9s9 4.05 9 9c0 4.455-3.24 8.145-7.515 8.91l-.495-.405H8.01z"
      />
      <Path
        fill="#fff"
        d="M12.51 11.52 12.915 9H10.53V7.245c0-.72.27-1.26 1.35-1.26h1.17V3.69c-.63-.09-1.35-.18-1.98-.18-2.07 0-3.51 1.26-3.51 3.51V9H5.31v2.52h2.25v6.345a8.3 8.3 0 0 0 2.97 0V11.52z"
      />
    </G>
    <Defs>
      <LinearGradient
        id="facebook_svg__b"
        x1={9}
        x2={9}
        y1={17.374}
        y2={-0.003}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#0062E0" />
        <Stop offset={1} stopColor="#19AFFF" />
      </LinearGradient>
      <ClipPath id="facebook_svg__a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgFacebook;
