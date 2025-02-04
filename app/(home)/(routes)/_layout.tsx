import { Stack } from 'expo-router';

export default function RoutesLayout() {
  return (
    <Stack>
      <Stack.Screen name="(browse)" options={{ headerShown: false }} />
      <Stack.Screen name="(personal)" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen name="update" options={{ headerShown: false }} />
    </Stack>
  );
}