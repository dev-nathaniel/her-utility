
import Colors from '@/constants/Colors'
import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgIconProps } from '.'

const UserIcon = ({width = '24', height = '24', type = 'primary'}: SvgIconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z" fill={type === 'primary' ? "#3B50DF" : "none"} stroke={type === 'primary' ? "white" : Colors.light.black} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5" fill={type === 'primary' ? "#3B50DF" : "none" } />
      <Path d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5" stroke={type === 'primary' ? "white" : Colors.light.black} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>

  )
}

export default UserIcon