import Colors from '@/constants/Colors';
import React from 'react';
import { FlatList, Text, View } from 'react-native';

type UtilityDetailsProps = {
    data?: {
        label: string;
        value: string;
    }[];
}
const UtilityDetails = ({data}: UtilityDetailsProps) => {
  return (
    <View style={{backgroundColor: Colors.light.white, borderRadius: 20, padding: 20, flex: 1, gap: 16}}>
      <Text style={{fontWeight: '600', fontSize: 20}}>Supply Details</Text>

      <FlatList
        data={[{label: 'Supplier', value: 'British Gas'}, {label: 'Tariff', value: 'Fixed 12 Months'}, {label: 'Annual Usage', value: '3,200 kWh'}, {label: 'Contract End Date', value: '12th Dec 2023'}]}
        keyExtractor={(item) => item.label}
        renderItem={({item}) => (
            <View style={{flexDirection: 'row', gap: 12, paddingHorizontal: 16, height: 64, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#E5E5E5', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 14, fontWeight: '400', flex: 1}}>{item.label}</Text>
                <Text style={{fontSize: 16, fontWeight: '500', textAlign: 'right'}}>{item.value}</Text>
            </View>
        )}
      />
    </View>
  )
}

export default UtilityDetails