import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Bottom Tab Navigator */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Stack screens (They open on top of Bottom Navigation) */}
      <Stack.Screen name="scan-details" options={{ presentation: "modal" }} />
    </Stack>
  );
}
