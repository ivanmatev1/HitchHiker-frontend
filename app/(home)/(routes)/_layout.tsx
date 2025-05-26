import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function RoutesLayout() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/(routes)/(browse)');
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(browse)" options={{ headerShown: false }} />
      <Stack.Screen name="(personal)" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen name="update" options={{ headerShown: false }} />
    </Stack>
  );
}