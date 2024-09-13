import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/authContext'

export default function home() {
  const {logout} = useAuth()
  // console.log("user in home",user)
  return (
    <View>
      <Pressable onPress={logout}>
      <Text>Logout</Text>
     
      </Pressable>
    </View>
  )
}