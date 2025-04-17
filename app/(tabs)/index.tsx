import HomeScreen from "../../src/screens/HomeScreen";

// export default HomeScreen;
// app/index.tsx
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext"; // 👈 adjust path
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/auth"); // 👈 go to auth if not logged in
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Show home screen content if logged in
  return (
     <HomeScreen/>
  );
}
