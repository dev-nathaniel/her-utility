import { Stack } from 'expo-router'
import React from 'react'

export default function AuthLayout() {
  // const {userId} = useUser()
  // const {seenOnboarding} = useOnboarding()

  // if (seenOnboarding === null) return null

  // if (!seenOnboarding) return <Redirect href="/(onboarding)/onboarding" />

  // if (userId) return <Redirect href="/(tabs)/home" />
  return (
    <Stack>
        <Stack.Screen name='login' options={{headerShown: false}} />
        <Stack.Screen name='emailCheck' options={{headerShown: false}} />
        <Stack.Screen name='emailCheck1' options={{headerShown: false}} />
        <Stack.Screen name='register' options={{headerShown: false}} />
        {/* <Stack.Screen name='success' options={{headerShown: false}} /> */}
    </Stack>
  )
}