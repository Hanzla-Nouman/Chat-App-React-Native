import {
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Octicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import Loading from "@/components/loading";
import { useAuth } from "@/context/authContext";

export default function logIn() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
 const {login} = useAuth()
  const handleLogin = async () => {
    if (!passwordRef.current && !emailRef.current) {
      Alert.alert("Sign In", "Please fill all the credentials");
      return;
    }
    setLoading(true)
   const response = await login(emailRef.current,passwordRef.current)
   setLoading(false)
   console.log("results",response)
   if (!response.success) {
     Alert.alert("Sign In", response.message);
   }
  };
  return (
    <KeyboardAvoidingView behavior="height " className="">
    <ScrollView className=" " showsVerticalScrollIndicator={false} overScrollMode="never">
    <View className="">
      <StatusBar style="dark" />
      <View
        style={{ paddingTop: hp(4), paddingHorizontal: wp(5) }}
        className=" gap-12"
      >
        <View className="items-center">
          <Image
            style={{ height: hp(28), width: wp(90) }}
            resizeMode="contain"
            source={require("../assets/images/login.jpg")}
          />
        </View>
        <View className=" gap-y-6 ">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wide text-center text-neutral-800"
          >
            Sign In 
          </Text>
       
          <View className="gap-y-5  ">
        
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
                  onChangeText={(value) => (passwordRef.current = value)}
                  secureTextEntry
                  style={{ fontSize: hp(2) }}
                  placeholder="Password"
                  className="flex-1 font-semibold text-neutral-700 ml-4"
                />
              </View>
              <Text
                style={{ fontSize: hp(1.7) }}
                className="text-right font-semibold text-neutral-500"
              >
                Forgot Password?
              </Text>
            </View>
            <View>
              {loading ? (
                <Loading size={hp(10)} />
              ) : (
                <TouchableHighlight
                  onPress={handleLogin}
                  className="bg-emerald-500 py-3 rounded-xl"
                >
                  <Text
                    style={{ fontSize: hp(2.8) }}
                    className="text-white text-center font-semibold tracking-wider"
                  >
                    Sign In
                  </Text>
                </TouchableHighlight>
              )}

              <View className="flex-row gap-x-3 justify-center mt-3 ">
                <Text
                  className="font-semibold text-neutral-500"
                  style={{ fontSize: hp(1.8) }}
                >
                  Don't have an account?
                </Text>
                <Pressable onPress={() => router.navigate("sign-up")}>
                  <Text
                    className="font-bold text-emerald-500"
                    style={{ fontSize: hp(1.8) }}
                  >
                    SignUp
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
