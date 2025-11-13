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
import useUser from '@/hooks/useUser'
import { fetchUser } from '@/lib/api'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQuery } from '@tanstack/react-query'
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

  // ref for businesses sheet (new)
  const businessSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleOpenSheet = useCallback(() => {
    console.log('Opening Sheet');
    console.log(bottomSheetRef.current);
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const handleCloseSheet = useCallback(async () => {
    
    bottomSheetRef.current?.close();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("token")
    await AsyncStorage.removeItem("refreshToken")
    router.replace("/(auth)/login")
  }

  // new: open/close business sheet callbacks
  const handleOpenBusinessSheet = useCallback(() => {
    // businessSheetRef.current?.snapToIndex(0);
  }, []);

  const handleCloseBusinessSheet = useCallback(() => {
    // businessSheetRef.current?.close();
  }, []);

  const AccountMenuItems = [
    {
      icon: <NotificationIcon type='secondary' />,
      title: 'Push Notifications',
      onPress: () => router.push('/(tabs)/profile')
    },
    {
      icon: <LicenseDraftIcon />,
      title: 'Businesses',
      onPress: () => handleOpenBusinessSheet()
    },
    {
      icon: <LogoutSquareIcon />,
      title: 'Logout',
      onPress: () => handleOpenSheet()
    },
  ]

  const { userId } = useUser()

  const { isLoading, error, data: user, isError, refetch } = useQuery({
    queryFn: () => fetchUser(userId as string),
    queryKey: ['user', userId],
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })

  // derive businesses from user data or fall back to a placeholder to avoid crashes
  const businesses = (user as any)?.user?.businesses ?? [
    // placeholder example structure
    {
      id: 'b_example',
      name: 'Example Business Ltd',
      sites: [
        { id: 's_example_1', name: 'Main Office' },
        { id: 's_example_2', name: 'Warehouse' }
      ]
    }
  ]
  return (
    <>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#EDEEF0' }} edges={['top', 'left', 'right']}>
        <View style={{ marginVertical: 32, alignItems: 'center', gap: 16 }}>
          <Image style={{ width: 72, height: 72 }} source={require('@/assets/images/pp.png')} />
          <View style={{ gap: 8, alignItems: 'center' }}>
            <Text style={{ fontWeight: '500', fontSize: 24, lineHeight: 22 }}>{user?.user.fullname}</Text>
            <Text style={{ fontWeight: '300', fontSize: 16 }}>{user?.user.email}</Text>
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
        <BottomSheetView style={{ alignItems: 'center', marginTop: 20 }}>
          <Image source={require('@/assets/images/logout.png')} />

          <Text style={{ marginTop: 20, fontSize: 24, fontWeight: '600', textAlign: 'center' }}>Are you sure you would like to log out</Text>

          <View style={{ marginTop: 36, width: '100%', gap: 12, marginBottom: 36 }}>
            <TouchableOpacity onPress={handleCloseSheet}>
              <View style={{ backgroundColor: Colors.light.tint, alignItems: 'center', paddingVertical: 22, borderRadius: 70 }}>
                <Text style={{ fontSize: 24, fontWeight: '600', color: Colors.light.white }}>Stay</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={logout}>
              <View style={{ backgroundColor: Colors.light.white, borderColor: Colors.light.tint, borderWidth: 1, alignItems: 'center', paddingVertical: 22, borderRadius: 70 }}>
                <Text style={{ fontSize: 24, fontWeight: '600', color: Colors.light.tint }}>Log out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>


      {/* Businesses bottom sheet (new) */}
      <BottomSheet enablePanDownToClose index={-1} style={{ paddingHorizontal: 16 }} ref={businessSheetRef} onChange={handleSheetChanges}>
        <BottomSheetView style={{ marginTop: 20, paddingBottom: 40 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '600' }}>Businesses & Sites</Text>
            <TouchableOpacity onPress={() => console.log('Add Business pressed')}>
              <View style={{ backgroundColor: Colors.light.tint, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12 }}>
                <Text style={{ color: Colors.light.white, fontWeight: '600' }}>Add Business</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 20, gap: 18 }}>
            {businesses.map((b: any) => (
              <View key={b.id} style={{ backgroundColor: Colors.light.white, borderRadius: 12, padding: 12, shadowColor: '#000', elevation: 2 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, fontWeight: '700' }}>{b.name}</Text>
                  <TouchableOpacity onPress={() => console.log('Add Site for', b.id)}>
                    <View style={{ borderColor: Colors.light.tint, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 }}>
                      <Text style={{ color: Colors.light.tint, fontWeight: '600' }}>Add Site</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{ marginTop: 12, gap: 8 }}>
                  {(b.sites || []).map((s: any) => (
                    <View key={s.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#f0f0f0' }}>
                      <View>
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>{s.name}</Text>
                        <Text style={{ fontSize: 12, color: '#6b6b6b', marginTop: 4 }}>Belongs to {b.name}</Text>
                      </View>

                      <View style={{ flexDirection: 'row', gap: 8 }}>
                        <TouchableOpacity onPress={() => console.log('Invite to site', s.id)}>
                          <View style={{ backgroundColor: Colors.light.tint, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 }}>
                            <Text style={{ color: Colors.light.white, fontWeight: '600' }}>Invite</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>

          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <TouchableOpacity onPress={handleCloseBusinessSheet}>
              <Text style={{ color: Colors.light.tint, fontWeight: '600' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  )
}

export default Profile