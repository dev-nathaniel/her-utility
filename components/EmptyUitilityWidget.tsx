import PlusIcon from '@/assets/icons/PlusIcon'
import Colors from '@/constants/Colors'
import React from 'react'
import { Dimensions, View } from 'react-native'

const EmptyUitilityWidget = () => {
    const screenWidth = Dimensions.get('window').width;
        const widgetWidth = (screenWidth - 42) / 2; // 60 accounts for padding and gaps
  return (
    <View style={{borderRadius: 20, borderWidth: 2, borderStyle: 'dashed', borderColor: Colors.light.tint, padding: 12, width: widgetWidth, height: 160, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{justifyContent: 'center', alignItems: 'center', borderRadius: 30, borderWidth: 2, borderStyle: 'dashed', borderColor : Colors.light.tint, padding: 15}}>
        <PlusIcon type='primary' />
      </View>
    </View>
  )
}

export default EmptyUitilityWidget