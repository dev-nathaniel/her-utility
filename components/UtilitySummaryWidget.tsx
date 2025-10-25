import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';
type UtilitySummaryWidgetProps = {
    icon: React.ReactNode;
    utility: string;
}

const UtilitySummaryWidget = ({icon, utility}: UtilitySummaryWidgetProps) => {
  return (
    <LinearGradient colors={[Colors.light.tint, '#6A80FF']} style={{paddingVertical: 24, paddingHorizontal: 20, gap: 10, borderRadius: 20}}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
        {icon}
        <Text style={{color: Colors.light.white, fontWeight: '600', fontSize: 20}}>{utility}</Text>
      </View>

      <View style={{backgroundColor: '#ffffff15', paddingHorizontal: 10, borderRadius: 10, paddingVertical: 4, alignSelf: 'flex-start'}}>
        <Text style={{color: '#FACC15', fontSize: 16, fontWeight: '500'}}>Expiring soon</Text>
      </View>

      <View>
        <Text style={{fontWeight: '500', fontSize: 16, color: Colors.light.white}}>Expires in 3 days</Text>
      </View>
    </LinearGradient>
  )
}

export default UtilitySummaryWidget