import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function success() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16, paddingHorizontal: 16 }}>
        <Image source={require('@/assets/images/lightbulb.png')} />

        <Text style={{ fontSize: 32, textAlign: 'center' }}>All done! We're on it</Text>
        <Text style={{ color: '#4F4F4F', fontSize: 16, textAlign: 'center' }}>Your quote request has been submitted successfully</Text>
      </View>
      <View style={{ width: '100%', paddingHorizontal: 16, gap: 16 }}>
        <Link href="/(tabs)/home" replace asChild>
          <TouchableOpacity>
            <View style={{ backgroundColor: Colors.light.tint, borderRadius: 70, paddingVertical: 18, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontWeight: '600', fontSize: 24, color: Colors.light.white }}>Go Home</Text>
            </View>
          </TouchableOpacity>
        </Link>
      </View>

      <LinearGradient colors={[Colors.light.tint, '#6A7BFF']} style={{ marginTop: 16, height: 8, width: `${(100 / 5) * 5}%` }}></LinearGradient>
    </SafeAreaView>
  )
}