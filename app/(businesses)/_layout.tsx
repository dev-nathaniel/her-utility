import { Stack } from 'expo-router'
import React from 'react'

export default function BusinessesLayout() {
  return (
    <Stack initialRouteName='business'>
        <Stack.Screen name='business' options={{headerShown: false}} />
        <Stack.Screen name='businesses' options={{headerShown: false}} />
        <Stack.Screen name='addSite' options={{headerShown: false}} />
        <Stack.Screen name='inviteMember' options={{headerShown: false}} />
        <Stack.Screen name='siteDetails' options={{headerShown: false}} />
        <Stack.Screen name='editMember' options={{headerShown: false}} />
    </Stack>
  )
}