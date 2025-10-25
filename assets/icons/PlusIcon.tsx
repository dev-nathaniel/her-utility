
import Colors from '@/constants/Colors'
import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgIconProps } from '.'

const PlusIcon = ({width = '30', height = '30', type = 'primary', color}: SvgIconProps) => {
  return (
<Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
<Path d="M15 5V25M25 15H5" stroke={type === 'primary' ? Colors.light.tint : type === 'secondary' ? "#000" : color} stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
</Svg>

  )
}

export default PlusIcon