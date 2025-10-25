import HelpCircleIcon from '@/assets/icons/HelpCircleIcon'
import LicenseDraftIcon from '@/assets/icons/LicenseDraftIcon'
import LogoutSquareIcon from '@/assets/icons/LogoutSquareIcon'
import MailOpenIcon from '@/assets/icons/MailOpenIcon'
import NotificationIcon from '@/assets/icons/NotificationIcon'
import ShieldEnergyIcon from '@/assets/icons/ShieldEnergyIcon'
import SmartPhoneIcon from '@/assets/icons/SmartPhoneIcon'
import GetQuote from '@/components/GetQuote'
import MenuList from '@/components/MenuList'
import Colors from '@/constants/Colors'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { router } from 'expo-router'
import React, { useCallback, useRef } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'



const TermsMenuItems = [
  {
    title: 'Terms & Conditions',
    onPress: () => console.log('Terms of Service pressed'),
    icon: <LicenseDraftIcon />
  },
  {
    title: 'Privacy Policy',
    onPress: () => console.log('Privacy Policy pressed'),
    icon: <ShieldEnergyIcon />
  },
]

const ContactMenuItems = [
  {
    title: 'admin@herutility.co.uk',
    onPress: () => console.log('Contact Support pressed'),
    icon: <MailOpenIcon />
  },
  {
    title: '+44 7305144380',
    onPress: () => console.log('Help Center pressed'),
    icon: <SmartPhoneIcon />
  },
  {
    title: 'FAQs',
    onPress: () => console.log('Feedback pressed'),
    icon: <HelpCircleIcon />
  }
]

const Profile = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleOpenSheet = useCallback(() => {
    console.log('Opening Sheet');
    console.log(bottomSheetRef.current);
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const handleCloseSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const AccountMenuItems = [
  {
    icon: <NotificationIcon />,
    title: 'Push Notifications',
    onPress: () => router.push('/(tabs)/profile')
  },
  {
    icon: <LogoutSquareIcon />,
    title: 'Logout',
    onPress: () => handleOpenSheet()
  },
]
  return (
    <>
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#EDEEF0' }} edges={['top', 'left', 'right']}>
      <View style={{ marginVertical: 32, alignItems: 'center', gap: 16 }}>
        <Image style={{ width: 72, height: 72 }} source={require('@/assets/images/pp.png')} />
        <View style={{ gap: 8, alignItems: 'center' }}>
          <Text style={{ fontWeight: '500', fontSize: 24, lineHeight: 22 }}>Adebayo Olowo</Text>
          <Text style={{ fontWeight: '300', fontSize: 16 }}>adebayoolowo@gmail.com</Text>
        </View>


        <View style={{ backgroundColor: Colors.light.tint, borderRadius: 70, paddingVertical: 13, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 50 }}>
          <Text style={{ color: Colors.light.white, fontSize: 16 }}>Edit Profile</Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

        <View style={{ marginBottom: 32 }}>

          <GetQuote />
        </View>
        <View style={{ gap: 32, marginBottom: 32 }}>

          <MenuList title='Account' items={AccountMenuItems} />
          <MenuList title='Terms' items={TermsMenuItems} />
          <MenuList title='Contact' items={ContactMenuItems} />
        </View>

      </ScrollView>

      
    </SafeAreaView>
    <BottomSheet enablePanDownToClose index={-1} style={{ paddingHorizontal: 16, }} ref={bottomSheetRef} onChange={handleSheetChanges}>
        <BottomSheetView style={{alignItems: 'center', marginTop: 20}}>
          <Image source={require('@/assets/images/logout.png')} />

          <Text style={{marginTop: 20, fontSize: 24, fontWeight: '600', textAlign: 'center'}}>Are you sure you would like to log out</Text>

          <View style={{marginTop: 36, width: '100%', gap: 12, marginBottom: 36}}>
            <TouchableOpacity onPress={handleCloseSheet}>
              <View style={{backgroundColor: Colors.light.tint, alignItems: 'center', paddingVertical: 22, borderRadius: 70}}>
                <Text style={{fontSize: 24, fontWeight: '600', color: Colors.light.white}}>Stay</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCloseSheet}>
              <View style={{backgroundColor: Colors.light.white, borderColor: Colors.light.tint, borderWidth: 1, alignItems: 'center', paddingVertical: 22, borderRadius: 70}}>
                <Text style={{fontSize: 24, fontWeight: '600', color: Colors.light.tint}}>Log out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
      </>
  )
}

export default Profile