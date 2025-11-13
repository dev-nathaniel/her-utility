import { siteType } from '@/app/(tabs)/home'
import ArrowDown from '@/assets/icons/ArrowDown'
import LocationIcon01 from '@/assets/icons/LocationIcon01'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type LocationWidgetProps = {
    onPress?: () => void;
    location: siteType;
}

const LocationWidget = ({onPress, location}: LocationWidgetProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#DCE0F8', paddingVertical: 16, paddingHorizontal: 20, borderRadius: 18, backgroundColor: '#E9ECFF'}}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
        <LocationIcon01 type='primary' />
        <View style={{gap: 2}}>
            <Text style={{fontWeight: '500', fontSize: 16, color: '#6B6B6B'}}>Current Location</Text>
            <Text style={{fontWeight: '600', fontSize: 20}}>{location.name}</Text>
        </View>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center', borderRadius: 40, borderWidth: 1, borderColor: '#D9D9D9', padding: 8}}>
        <ArrowDown type='primary' />
      </View>
    </View>
    </TouchableOpacity>
  )
}

export default LocationWidget