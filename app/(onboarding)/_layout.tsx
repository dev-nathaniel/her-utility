import { Stack } from 'expo-router'
import React from 'react'

export default function OnboardingLayout() {
    // const { seenOnboarding } = useOnboarding()
    // const {userId} = useUser()

    // if (seenOnboarding === null) return null

    // if (seenOnboarding && !userId) return <Redirect href="/(auth)/login" />
    // if (userId) return <Redirect href="/(tabs)/home" />
  return (
    <Stack initialRouteName='onboarding'>
        <Stack.Screen name='onboarding' options={{headerShown: false}} />
    </Stack>
  )
}