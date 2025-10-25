
import Colors from '@/constants/Colors'
import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgIconProps } from '.'

const LocationIcon02 = ({width = '28', height = '28', type = 'primary', color}: SvgIconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" fill="none">
<Path d="M15.8873 24.9281C15.3815 25.4018 14.7051 25.6666 14.0013 25.6666C13.2974 25.6666 12.6212 25.4018 12.1153 24.9281C7.48186 20.5636 1.27255 15.688 4.30065 8.60952C5.9379 4.78227 9.86806 2.33325 14.0013 2.33325C18.1346 2.33325 22.0647 4.78227 23.702 8.60952C26.7262 15.6791 20.5322 20.5786 15.8873 24.9281Z" stroke={type === 'primary' ? Colors.light.tint : type === 'secondary' ? "#000" : color} stroke-width="1.5"/>
<Path d="M18.0833 12.8333C18.0833 15.0885 16.2552 16.9167 14 16.9167C11.7448 16.9167 9.91667 15.0885 9.91667 12.8333C9.91667 10.5782 11.7448 8.75 14 8.75C16.2552 8.75 18.0833 10.5782 18.0833 12.8333Z" stroke={type === 'primary' ? Colors.light.tint : type === 'secondary' ? "#000" : color} stroke-width="1.5"/>
</Svg>
  )
}

export default LocationIcon02