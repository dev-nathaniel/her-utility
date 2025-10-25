import { Stack } from 'expo-router'
import React from 'react'

export default function QuoteLayout() {
  return (
    <Stack initialRouteName='getQuote1'>
        <Stack.Screen name='getQuote1' options={{headerShown: false}} />
        <Stack.Screen name='getQuote2' options={{headerShown: false}} />
        <Stack.Screen name='getQuote3' options={{headerShown: false}} />
        <Stack.Screen name='getQuote4' options={{headerShown: false}} />
        <Stack.Screen name='success' options={{headerShown: false}} />
    </Stack>
  )
}