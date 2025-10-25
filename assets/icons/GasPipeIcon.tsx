
import Colors from '@/constants/Colors'
import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgIconProps } from '.'

const GasPipeIcon = ({width = '30', height = '30', type = 'primary', color}: SvgIconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
<Path d="M2.5 21.875H10M10 25.625H2.5" stroke={type === 'primary' ? Colors.light.tint : type === 'secondary' ? "#000" : color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M20 21.875H27.5M27.5 25.625H20" stroke={type === 'primary' ? Colors.light.tint : type === 'secondary' ? "#000" : color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M16.875 15H13.125V20H16.875V15Z" stroke={type === 'primary' ? Colors.light.tint : type === 'secondary' ? "#000" : color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M21.25 8.75C21.25 12.2018 18.4517 15 15 15C11.5482 15 8.75 12.2018 8.75 8.75C8.75 5.29822 11.5482 2.5 15 2.5C18.4517 2.5 21.25 5.29822 21.25 8.75Z" stroke={type === 'primary' ? Colors.light.tint : type === 'secondary' ? "#000" : color} stroke-width="1.5"/>
<Path d="M15 8.75L16.875 6.875" stroke={type === 'primary' ? Colors.light.tint : type === 'secondary' ? "#000" : color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M17.5 20H12.5C11.3215 20 10.7322 20 10.3661 20.3661C10 20.7323 10 21.3215 10 22.5V25C10 26.1785 10 26.7677 10.3661 27.1339C10.7322 27.5 11.3215 27.5 12.5 27.5H17.5C18.6785 27.5 19.2677 27.5 19.6339 27.1339C20 26.7677 20 26.1785 20 25V22.5C20 21.3215 20 20.7323 19.6339 20.3661C19.2677 20 18.6785 20 17.5 20Z" stroke={type === 'primary' ? Colors.light.tint : type === 'secondary' ? "#000" : color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</Svg>
  )
}

export default GasPipeIcon