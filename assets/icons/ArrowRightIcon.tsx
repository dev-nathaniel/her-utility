import Colors from '@/constants/Colors'
import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgIconProps } from '.'

const ArrowRightIcon = ({width = '25', height = '22', type = 'primary', color}: SvgIconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 25 22" fill="none">
<Path d="M23.2501 10.75H0.75" stroke={type === 'primary' ? Colors.light.tint : type === 'secondary' ? "#000" : color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M14.25 20.75C14.25 20.75 24.25 13.3852 24.25 10.75C24.25 8.11467 14.25 0.75 14.25 0.75" stroke={type === 'primary' ? Colors.light.tint : type === 'secondary' ? "#000" : color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</Svg>
  )
}

export default ArrowRightIcon


