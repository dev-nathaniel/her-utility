
import Colors from '@/constants/Colors'
import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgIconProps } from '.'

const ArrowDown = ({width = '24', height = '24', type = 'primary', color}: SvgIconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
<Path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke={type === 'primary' ? Colors.light.tint : type === 'secondary' ? "#000" : color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</Svg>
  )
}

export default ArrowDown