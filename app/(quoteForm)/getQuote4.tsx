import LocationIcon01 from '@/assets/icons/LocationIcon01';
import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const GetQuote4 = () => {
 const [postcode, setPostcode] = React.useState<string>();

 console.log(postcode);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{alignItems: 'center', gap: 16}}>
      <Text style={{ fontSize: 32, textAlign: 'center', paddingHorizontal: 16, marginTop: 70 }}>What's your business postcode?</Text>
        <Text style={{textAlign: 'center'}}>Your postcode is needed to provide you with the most accurate quote possible</Text>
      </View>

      <View style={{ paddingHorizontal: 16, justifyContent: 'center', flex: 1, alignContent: 'center', width: '100%', gap: 12 }}>
        <View style={{flexDirection: 'row', alignItems: 'center', borderRadius: 20, borderColor: '#E14B4B', borderWidth: 2, paddingHorizontal: 20, width: '100%', gap: 20, paddingVertical: 18}}>
          <LocationIcon01 />
          <TextInput onChangeText={(text) => setPostcode(text)} value={postcode} placeholder='LE2 0JF' style={{fontSize: 36, flex: 1}} />
        </View>

        <Text style={{fontSize: 20, color: '#E14B4B'}}>Please enter a valid postcode</Text>
      </View>

      <View style={{ width: '100%', paddingHorizontal: 16, gap: 16 }}>
        <Link href="/(quoteForm)/success" asChild>
          <TouchableOpacity disabled={!postcode}>
            <View style={{ backgroundColor: Colors.light.tint, borderRadius: 70, paddingVertical: 18, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontWeight: '600', fontSize: 24, color: Colors.light.white }}>Next</Text>
            </View>
          </TouchableOpacity>
        </Link>


        <TouchableOpacity onPress={() => router.back()} >
          <Text style={{ alignSelf: 'center', color: Colors.light.tint, fontSize: 24, fontWeight: '600' }}>Back</Text>
        </TouchableOpacity>
      </View>

      <LinearGradient colors={[Colors.light.tint, '#6A7BFF']} style={{ marginTop: 16, height: 8, width: `${(100 / 5) * 4}%` }}></LinearGradient>
    </SafeAreaView>
  )
}

export default GetQuote4