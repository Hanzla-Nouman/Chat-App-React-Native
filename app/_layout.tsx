import { AuthContextProvider, useAuth } from "@/context/authContext";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

function MainLayout() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  useEffect(() => {
    if (typeof isAuthenticated === undefined) return;
    const inApp = segments[0] === "(app)";
    if (isAuthenticated && !inApp) {
      router.replace("/home");
    } else if (isAuthenticated === false) {
      router.replace("/log-in");
    } else {
      router.replace("/sign-up");
    }
  }, [isAuthenticated]);
  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}
