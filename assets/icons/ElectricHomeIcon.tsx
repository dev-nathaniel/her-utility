
import Colors from '@/constants/Colors'
import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgIconProps } from '.'

const ElectricHomeIcon = ({width = '30', height = '30', type = 'primary', color}: SvgIconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
<Path d="M25 10.7312V16.8755C25 21.5895 25 23.9466 23.5355 25.411C22.5254 26.4213 21.0904 26.7346 18.75 26.8318M5 10.7312V16.8755C5 21.5895 5 23.9466 6.46446 25.411C7.79331 26.7399 9.85704 26.863 13.7497 26.8744C14.4401 26.8764 15 26.3159 15 25.6255V21.8755" stroke={type === 'primary' ? Colors.light.tint : type === 'secondary' ? "#000" : color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M27.5 13.1254L22.0711 7.91984C18.7378 4.7236 17.0711 3.12549 15 3.12549C12.9289 3.12549 11.2623 4.7236 7.92894 7.91984L2.5 13.1254" stroke={type === 'primary' ? Colors.light.tint : type === 'secondary' ? "#000" : color} stroke-width="1.5" stroke-linecap="round"/>
<Path d="M17.5013 11.2505V14.3754M12.5013 14.3754V11.2505M10.6319 15.4754C10.5829 14.8818 11.095 14.3754 11.7444 14.3754H18.263C18.9124 14.3754 19.4245 14.8818 19.3755 15.4754L19.2414 17.0972C19.145 18.2631 18.7233 19.3867 18.0166 20.3599L17.5785 20.9633C17.1649 21.5331 16.4676 21.8754 15.721 21.8754H14.2864C13.5398 21.8754 12.8426 21.5331 12.4289 20.9633L11.9908 20.3599C11.2841 19.3867 10.8623 18.2631 10.766 17.0972L10.6319 15.4754Z" stroke={type === 'primary' ? Colors.light.tint : type === 'secondary' ? "#000" : color} stroke-width="1.5" stroke-linecap="round"/>
</Svg>
  )
}

export default ElectricHomeIcon