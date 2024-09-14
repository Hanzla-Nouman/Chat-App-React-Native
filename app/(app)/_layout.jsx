
import React from 'react'
import { Stack } from 'expo-router'
import ChatHeader from '@/components/chatHeader'

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name='home' options={{header:()=><ChatHeader/>}}/>

     
    </Stack>
  )
}