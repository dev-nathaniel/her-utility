import { Stack } from 'expo-router'
import React from 'react'

export default function AuthLayout() {
  return (
    <Stack initialRouteName='login'>
        <Stack.Screen name='login' options={{headerShown: false}} />
        <Stack.Screen name='emailCheck' options={{headerShown: false}} />
        <Stack.Screen name='emailCheck1' options={{headerShown: false}} />
        <Stack.Screen name='register' options={{headerShown: false}} />
        {/* <Stack.Screen name='success' options={{headerShown: false}} /> */}
    </Stack>
  )
}