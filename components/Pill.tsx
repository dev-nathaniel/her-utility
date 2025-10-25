import Colors from '@/constants/Colors';
import React from 'react';
import { Text, View } from 'react-native';

interface PillProp {
  text: string;
  selected: boolean;
}

const Pill = ({text, selected}: PillProp) => {
  return (
    <View style={{ backgroundColor: '#E9EBFF', paddingVertical: 12, paddingHorizontal: 18, gap: 8, borderRadius: 48, flexDirection: 'row', alignItems: 'center'}}>
      <View style={{width: 18, height: 18, borderRadius: 20, borderWidth: selected ? 4 : 2, borderColor: Colors.light.tint, backgroundColor: selected ? Colors.light.white : "none"}}></View>
      <Text style={{fontSize: 24}}>{text}</Text>
    </View>
  )
}

export default Pill