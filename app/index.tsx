// import { useOnboarding } from '@/hooks/useOnboarding'
// import useUser from '@/hooks/useUser'
// import { router } from 'expo-router'

// export default function index() {
//     const {userId, loading: userLoading} = useUser()
//     const {seenOnboarding, loading: onboardLoading} = useOnboarding()

//     console.log(userId, seenOnboarding, 'index')

//     if (seenOnboarding === null) return null

//         if (!seenOnboarding) {
//             router.replace('/(onboarding)/onboarding')
//             // return <Redirect href={'/(onboarding)/onboarding'} />
//         }

//     if (!userId) {
//         router.replace('/(auth)/login')
//         // return <Redirect href={'/(auth)/login'} />
//     }

//     // if (userLoading || onboardLoading) {
//     //     return (
//     //         <View style={{justifyContent: 'center', alignItems: 'center'}}>
//     //             <ActivityIndicator />
//     //         </View>
//     //     )
//     // }

//     if (seenOnboarding && userId) {
//         router.replace('/(tabs)/home')
//     }

//     // return (
//     //     <LinearGradient style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16}} colors={['#A9B5FF', '#5D72F0']}>
//     //   <View>
//     //     <Image source={require('@/assets/images/onboardImg.png')} />
//     //   </View>

//     //   <View style={{marginTop: 40, marginBottom: 60}}>
//     //     <Text style={{fontSize: 32, color: Colors.light.white, fontWeight: 'semibold', lineHeight: 42, textAlign: 'center'}}>SAVE MONEY ON UTILITIES</Text>
//     //   </View>

//     //   <View style={{alignSelf: 'stretch'}}>
//     //     <Link href="/(auth)/login" asChild>
//     //               <TouchableOpacity>
//     //                 <View style={{ backgroundColor: Colors.light.white, borderRadius: 70, paddingVertical: 18, justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch' }}>
//     //                   <Text style={{ fontWeight: '600', fontSize: 24, color: Colors.light.tint }}>Get Started</Text>
//     //                 </View>
//     //               </TouchableOpacity>
//     //             </Link>
//     //   </View>
//     // </LinearGradient>
//     // )

//     // <Redirect href={'/(onboarding)/onboarding'} />

// }

import Colors from '@/constants/Colors'
import { useOnboarding } from '@/hooks/useOnboarding'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function Onboarding() {
  const {completeOnboarding, seenOnboarding, loading} = useOnboarding()

//   useEffect(() => {
// if (!loading && seenOnboarding) {
//     console.log(seenOnboarding, 'seenonboarding')
//     router.replace('/(auth)/login')
//   }
//   }, [loading, seenOnboarding])
  
  return (
    <LinearGradient style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16}} colors={['#A9B5FF', '#5D72F0']}>
      <View>
        <Image source={require('@/assets/images/onboardImg.png')} />
      </View>

      <View style={{marginTop: 40, marginBottom: 60}}>
        <Text style={{fontSize: 32, color: Colors.light.white, fontWeight: 'semibold', lineHeight: 42, textAlign: 'center'}}>SAVE MONEY ON UTILITIES</Text>
      </View>

      <View style={{alignSelf: 'stretch'}}>
        <Link href="/(auth)/login" replace asChild>
                  <TouchableOpacity>
                  {/* <TouchableOpacity onPress={completeOnboarding}> */}
                    <View style={{ backgroundColor: Colors.light.white, borderRadius: 70, paddingVertical: 18, justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch' }}>
                      <Text style={{ fontWeight: '600', fontSize: 24, color: Colors.light.tint }}>Get Started</Text>
                    </View>
                  </TouchableOpacity>
                </Link>
      </View>
    </LinearGradient>
  )
}