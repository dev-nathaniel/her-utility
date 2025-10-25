import ArrowUpRight from '@/assets/icons/ArrowUpRight'
import Colors from '@/constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Dimensions, Text, View } from 'react-native'

type UtilityWidgetProps = {
  utility: string
  icon: React.ReactNode
}

const UtilityWidget = ({utility, icon}: UtilityWidgetProps) => {
    const screenWidth = Dimensions.get('window').width;
    const widgetWidth = (screenWidth - 42) / 2; // 60 accounts for padding and gaps
  return (
    <LinearGradient start={{ x: 0.5, y: 0}} end={{ x: 1, y: 1}} colors={[Colors.light.tint, '#3B50DF50']} style={{borderRadius: 20, padding: 12, justifyContent: 'space-between', width: widgetWidth, height: 160}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={{fontWeight: '400', fontSize: 24, color: Colors.light.white}}>{utility}</Text>
        <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#26CCB4', borderRadius: 20, padding: 4}}>
            <ArrowUpRight type='secondary' />
        </View>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center', borderRadius: 30, borderWidth: 2, borderStyle: 'dashed', borderColor: Colors.light.white, alignSelf: 'flex-start', padding: 15}}>
        {icon}
      </View>
    </LinearGradient>
  )
}

export default UtilityWidget