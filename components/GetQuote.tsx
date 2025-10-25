import ArrowRightIcon from '@/assets/icons/ArrowRightIcon'
import ArrowUpRight from '@/assets/icons/ArrowUpRight'
import Colors from '@/constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, View } from 'react-native'

const GetQuote = () => {
  return (
    <LinearGradient start={{ x: 0.5, y: 0}} end={{ x: 1, y: 1}} colors={[Colors.light.tint, '#3B50DF50']} style={{padding: 12, borderRadius: 20, height: 130, justifyContent: 'space-between'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{fontSize: 20, fontWeight: '400', color: '#fff', maxWidth: 180}}>Compare Business Energy Prices</Text>
        <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#26CCB4', borderRadius: 20, padding: 8, alignSelf: 'flex-start'}}>
            <ArrowUpRight type='secondary' />
        </View>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 16, borderRadius: 70, paddingVertical: 8, gap: 16, alignSelf: 'flex-start'}}>
        <Text style={{fontSize: 16, fontWeight: '400'}}>Get Quote</Text>
        <ArrowRightIcon type='secondary' />
      </View>
    </LinearGradient>
  )
}

export default GetQuote