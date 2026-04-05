import { Stack } from "expo-router";
import { WantProvider } from "./context/WantContext";

export default function RootLayout() {
  return (
    <WantProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </WantProvider>
  );
}
