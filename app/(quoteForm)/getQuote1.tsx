import Pill from '@/components/Pill'
import Colors from '@/constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const utilities = ['Electricity', 'Water', 'Gas']

const GetQuote1 = () => {
  const [selectedUtility, setSelectedUtility] = React.useState<string | null>(null);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 32, textAlign: 'center', paddingHorizontal: 16, marginTop: 70 }}>Which utility would you like a quote for?</Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, justifyContent: 'center', gap: 24, flex: 1, alignItems: 'center', alignContent: 'center' }}>
        {utilities.map((utility) => (
          <TouchableOpacity key={utility} onPress={() => setSelectedUtility(utility)}>
            <Pill text={utility} selected={selectedUtility === utility} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ width: '100%', paddingHorizontal: 16, gap: 16 }}>
        <Link href="/(quoteForm)/getQuote2" asChild>
          <TouchableOpacity disabled={!selectedUtility}>
            <View style={{ backgroundColor: Colors.light.tint, borderRadius: 70, paddingVertical: 18, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontWeight: '600', fontSize: 24, color: Colors.light.white }}>Next</Text>
            </View>
          </TouchableOpacity>
        </Link>


        <TouchableOpacity onPress={() => router.back()} >
          <Text style={{ alignSelf: 'center', color: Colors.light.tint, fontSize: 24, fontWeight: '600' }}>Back</Text>
        </TouchableOpacity>
      </View>

      <LinearGradient colors={[Colors.light.tint, '#6A7BFF']} style={{ marginTop: 16, height: 8, width: `${100 / 5}%` }}></LinearGradient>
    </SafeAreaView>
  )
}

export default GetQuote1