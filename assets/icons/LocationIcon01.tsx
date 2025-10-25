
import Colors from '@/constants/Colors'
import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgIconProps } from '.'

const LocationIcon01 = ({width = '32', height = '32', type = 'primary', color}: SvgIconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
<Path d="M19.3333 12C19.3333 13.8409 17.8409 15.3333 16 15.3333C14.159 15.3333 12.6666 13.8409 12.6666 12C12.6666 10.159 14.159 8.66663 16 8.66663C17.8409 8.66663 19.3333 10.159 19.3333 12Z" stroke={type === 'primary' ? Colors.light.tint : type === 'secondary' ? "#000" : color} stroke-width="1.5"/>
<Path d="M17.6765 23.3248C17.2268 23.7578 16.6257 24 16.0002 24C15.3746 24 14.7736 23.7578 14.3238 23.3248C10.2057 19.3344 4.68688 14.8766 7.37824 8.40493C8.83343 4.90572 12.3265 2.66663 16.0002 2.66663C19.6738 2.66663 23.1669 4.90573 24.6221 8.40493C27.3101 14.8685 21.8048 19.3481 17.6765 23.3248Z" stroke={type === 'primary' ? Colors.light.tint : type === 'secondary' ? "#000" : color} stroke-width="1.5"/>
<Path d="M24 26.6666C24 28.1394 20.4183 29.3333 16 29.3333C11.5817 29.3333 8 28.1394 8 26.6666" stroke={type === 'primary' ? Colors.light.tint : type === 'secondary' ? "#000" : color} stroke-width="1.5" stroke-linecap="round"/>
</Svg>
  )
}

export default LocationIcon01