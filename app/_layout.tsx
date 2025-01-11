import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  const router = useRouter();
  async function checkUserStatus() {
    try {
      const user = await GoogleSignin.getCurrentUser();
      if (user === null) {
        router.replace("/(login)");
      } else {
        console.log("user!!!!!:", user);
        router.replace("/(home)");
      }
    } catch (error) {
      console.log("Error fetching current user:", error);
    }
  }

  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(login)" options={{ headerShown: false }} />
      <Stack.Screen name="(home)" />
    </Stack>
  );
}

