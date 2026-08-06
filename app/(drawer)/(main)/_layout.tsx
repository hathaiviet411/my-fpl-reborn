import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="qr-scanner"
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
