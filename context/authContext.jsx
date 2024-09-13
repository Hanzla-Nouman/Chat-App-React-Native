import { auth, db } from "@/firebaseConfiguration";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState, createContext, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid)
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

   const updateUserData = async (userId )=>{
    const docRef = doc(db,"users",userId);
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      let data = docSnap.data();
      setUser({...user,username:data.username,profileUrl:data.profileUrl,userId:data.userId,})
    }
   }

  const login = async (email, password) => {
    try {
      console.log("logging in")
      const response = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { success: true, data: response?.user };
    } catch (error) {
      let msg = error.message;
      if(msg.includes('(auth/invalid-email)')) msg='Invalid Email'
      if(msg.includes('(auth/invalid-credential)')) msg='Wrong Credentials'
      return { success: false, message: msg };
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  const register = async (password, username, email, profileUrl) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response?.user);
      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        profileUrl,
        userId: response?.user?.uid,
      });
      return { success: true, data: response?.user };
    } catch (error) {
      let msg = error.message;
      if(msg.includes('(auth/invalid-email)')) msg='Invalid Email'
      if(msg.includes('(auth/email-already-in-use)')) msg='Email is already in use'
      return { success: false, message: msg };
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return value;
};
