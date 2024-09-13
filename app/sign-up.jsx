import {
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather, Octicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";
import Loading from "@/components/loading";

export default function signUp() {
  const {register} = useAuth()
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const username = useRef("");
  const profileUrl = useRef("");
  const [loading, setLoading] = useState(false);
  const handleSignup = async () => {
    if (!passwordRef.current && !username.current && !emailRef.current && !profileUrl.current) {
      Alert.alert("Sign Up", "Please fill all the credentials");
      return;
    }
    setLoading(true)
    let response = await register(passwordRef.current ,username.current ,emailRef.current,profileUrl.current)
    setLoading(false)
    console.log("results",response)
    if (!response.success) {
      Alert.alert("Sign Up", response.message);
    }
  };
  const ios = Platform.OS ==="ios"
  return (
    <KeyboardAvoidingView behavior="height " className="">
            <ScrollView className=" " showsVerticalScrollIndicator={false} overScrollMode="never">
    <View className="flex-1  ">
      <StatusBar style="dark" />
      <View
        style={{ paddingTop: hp(4), paddingHorizontal: wp(5) }}
        className="flex-1  justify-evenly"
      >
        <View className="items-center">
          <Image
            style={{ height: hp(28), width: wp(90) }}
            resizeMode="contain"
            source={require("../assets/images/signin.png")}
          />
        </View>
       
          <View className=" gap-y-6 ">
            <Text
              style={{ fontSize: hp(4) }}
              className="font-bold tracking-wide text-center text-neutral-800"
            >
              Sign Up
            </Text>
              <View className="gap-y-5">
              <View
                style={{ height: hp(7), width: wp(90) }}
                className="flex-row  px-4 text-center bg-neutral-100 items-center   rounded-xl"
              >
                <Feather name="image" color={"gray"} size={hp(2.7)} />
                <TextInput
                  onChangeText={(value) => (profileUrl.current = value)}
                  style={{ fontSize: hp(2) }}
                  placeholder="Profile Url"
                  className="flex-1 font-semibold text-neutral-700 ml-4"
                />
              </View>
              <View
                style={{ height: hp(7), width: wp(90) }}
                className="flex-row  px-4 text-center bg-neutral-100 items-center   rounded-xl"
              >
                <Feather name="user" color={"gray"} size={hp(2.7)} />
               
                <TextInput
                  onChangeText={(value) => (username.current = value)}
                  style={{ fontSize: hp(2) }}
                  placeholder="Username"
                  className="flex-1 font-semibold text-neutral-700 ml-4"
                />
              </View>
              <View
                style={{ height: hp(7), width: wp(90) }}
                className="flex-row  px-4 text-center bg-neutral-100 items-center   rounded-xl"
              >
                <Octicons name="mail" color={"gray"} size={hp(2.7)} />
                <TextInput
                  onChangeText={(value) => (emailRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  placeholder="Email Address"
                  className="flex-1 font-semibold text-neutral-700 ml-4"
                />
              </View>
              <View>
                <View
                  style={{ height: hp(7), width: wp(90) }}
                  className="flex-row  px-4 text-center bg-neutral-100 items-center   rounded-xl"
                >
                  <Octicons name="lock" color={"gray"} size={hp(2.7)} />
                  <TextInput
                    secureTextEntry
                    onChangeText={(value) => (passwordRef.current = value)}
                    style={{ fontSize: hp(2) }}
                    placeholder="Password"
                    className="flex-1 font-semibold text-neutral-700 ml-4"
                  />
                </View>
              </View>


              <View>
              {loading ? (
                <Loading size={hp(10)} />
              ) : (
                <TouchableHighlight
                  onPress={handleSignup}
                  className="bg-emerald-500 py-3 rounded-xl"
                >
                  <Text
                    style={{ fontSize: hp(2.8) }}
                    className="text-white text-center font-semibold tracking-wider"
                  >
                    Sign Up
                  </Text>
                </TouchableHighlight>
              )}
                <View className="flex-row gap-x-3 justify-center mt-3 ">
                  <Text
                    className="font-semibold text-neutral-500"
                    style={{ fontSize: hp(1.8) }}
                  >
                    Already have an account?
                  </Text>
                  <Pressable onPress={() => router.navigate("log-in")}>
                    <Text
                      className="font-bold text-emerald-500"
                      style={{ fontSize: hp(1.8) }}
                    >
                      Login
                    </Text>
                  </Pressable>
                </View>
              </View>
              </View>
          </View>
       
      </View>
    </View>
            </ScrollView>
            </KeyboardAvoidingView>
  );
}
