import { initializeApp } from "firebase/app";
import {initializeAuth,getReactNativePersistence } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore,collection} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDvKltSp5Q2WXCWiLMOoH9LKDXvoEgM_SA",
  authDomain: "fir-chatapp-50a29.firebaseapp.com",
  projectId: "fir-chatapp-50a29",
  storageBucket: "fir-chatapp-50a29.appspot.com",
  messagingSenderId: "504567941721",
  appId: "1:504567941721:web:d786ac64ae9cc9dc21bf48"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,{
    persistence: getReactNativePersistence (AsyncStorage)
})

export const db = getFirestore(app)

export const usersRef = collection(db,'user')
export const roomRef = collection(db,'rooms')