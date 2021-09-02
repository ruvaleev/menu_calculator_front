import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LoadingIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="prefix__icon prefix__icon-tabler prefix__icon-tabler-loader"
      width={44}
      height={44}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#2c3e50"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M0 0h24v24H0z" stroke="none" />
      <Path d="M12 6V3M16.25 7.75L18.4 5.6M18 12h3M16.25 16.25l2.15 2.15M12 18v3M7.75 16.25L5.6 18.4M6 12H3M7.75 7.75L5.6 5.6" />
    </Svg>
  )
}

export default LoadingIcon
