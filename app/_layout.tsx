// import React from "react";
// import { Stack } from "expo-router";

// export default function Layout() {
//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       {/* Bottom Tab Navigator */}
//       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

//       {/* Stack screens (They open on top of Bottom Navigation) */}
//       <Stack.Screen name="scan-details" options={{ presentation: "modal" }} />
//       <Stack.Screen name="solution" options={{ presentation: "modal" }} />
//       <Stack.Screen name="news" options={{ presentation: "modal" }} />

//     </Stack>
//   );
// }
// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext"; // 👈 adjust path

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" />
        <Stack.Screen name="scan-details"  />
        {/* <Stack.Screen name="solution" options={{ presentation: "modal" }} /> */}
        <Stack.Screen name="images" />
        <Stack.Screen name="maps" />
        <Stack.Screen name="camera" />

      </Stack>
    </AuthProvider>
  );
}
