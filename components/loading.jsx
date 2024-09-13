import React from 'react';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';

export default function Loading({size}) {
  return (
    <View style={{height:size,ascpectRatio:1}}>
    <LottieView style={{flex:1}} source={require('../assets/images/Animation - 1724392991575.json')} autoPlay loop />
    </View>
  );
}