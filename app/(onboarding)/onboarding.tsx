import Colors from '@/constants/Colors'
import { useOnboarding } from '@/hooks/useOnboarding'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function Onboarding() {
  const {completeOnboarding} = useOnboarding()
  return (
    <LinearGradient style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16}} colors={['#A9B5FF', '#5D72F0']}>
      <View>
        <Image source={require('@/assets/images/onboardImg.png')} />
      </View>

      <View style={{marginTop: 40, marginBottom: 60}}>
        <Text style={{fontSize: 32, color: Colors.light.white, fontWeight: 'semibold', lineHeight: 42, textAlign: 'center'}}>SAVE MONEY ON UTILITIES</Text>
      </View>

      <View style={{alignSelf: 'stretch'}}>
        {/* <Link href="/(auth)/login" asChild> */}
                  <TouchableOpacity onPress={completeOnboarding}>
                    <View style={{ backgroundColor: Colors.light.white, borderRadius: 70, paddingVertical: 18, justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch' }}>
                      <Text style={{ fontWeight: '600', fontSize: 24, color: Colors.light.tint }}>Get Started</Text>
                    </View>
                  </TouchableOpacity>
                {/* </Link> */}
      </View>
    </LinearGradient>
  )
}